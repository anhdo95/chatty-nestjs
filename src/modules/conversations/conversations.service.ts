import { ModuleRef } from '@nestjs/core'
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { ConversationsResponseDto, ConversationsRequestDto } from './dtos/conversations.dto'
import { ConversationResponseDto, ConversationRequestDto } from './dtos/conversation.dto'

import { Conversation, ConversationType } from '@/database/entities/conversation.entity'
import { ConversationInfo } from '@/database/entities/conversation-info.entity'
import { ConversationInfoService } from '@/modules/conversation-info/conversation-info.service'
import { MessagesService } from '@/modules/messages/messages.service'
import { UsersService } from '@/modules/users/users.service'
import { Message } from '@/database/entities/message.entity'

type ConversationRelations = ConversationInfo | Message

@Injectable()
export class ConversationsService implements OnModuleInit {
  private messagesService: MessagesService

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly usersService: UsersService,
    private readonly conversationInfoService: ConversationInfoService,

    @InjectRepository(Conversation)
    private readonly conversationsRepo: MongoRepository<Conversation>,
  ) {}

  onModuleInit() {
    this.messagesService = this.moduleRef.get(MessagesService, { strict: false })
  }

  async getById(id: number): Promise<ConversationResponseDto> {
    const conversation = await this.conversationsRepo
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.lastMessage', 'lastMessage')
      .leftJoinAndSelect('conversation.users', 'users')
      .where('conversation.id = :id', { id })
      .getOne()

    if (!conversation) {
      throw new NotFoundException('Conversation is not found!')
    }

    return new ConversationResponseDto(conversation)
  }

  async getUserConversations(
    userId: number,
    params: ConversationsRequestDto,
  ): Promise<ConversationsResponseDto> {
    const conversationQuery = this.conversationsRepo
      .createQueryBuilder('conversation')
      .leftJoin('conversation.users', 'user')
      .leftJoinAndSelect('conversation.lastMessage', 'lastMessage')
      .where('user.id = :userId', { userId })
      .orderBy('lastMessage.createdAt', 'DESC')

    if (params.offset) {
      conversationQuery.skip(params.offset)
    }

    if (params.limit) {
      conversationQuery.take(params.limit)
    }

    const [items, count] = await conversationQuery.getManyAndCount()

    return new ConversationsResponseDto({ items, totalItems: count })
  }

  getConversationType(userIds: number[]) {
    return userIds.length > 1 ? ConversationType.Channel : ConversationType.Direct
  }

  async createRelations(conversation: Conversation): Promise<ConversationRelations[]> {
    const userIds = conversation.users.map(user => user.id)

    const entities = await Promise.all(
      userIds.map(userId =>
        this.conversationInfoService.create({
          conversationId: conversation.id,
          userId,
        }),
      ),
    )

    const lastMessage = await this.messagesService.create({
      conversationId: conversation.id,
      content: 'Say hi to your friend!',
    })

    conversation.lastMessageId = lastMessage.id
    await this.conversationsRepo.save(conversation)
    conversation.lastMessage = lastMessage

    return entities
  }

  async create(
    conversationRequest: ConversationRequestDto,
    ownerId: number,
  ): Promise<ConversationResponseDto> {
    const existingConversation = await this.getDirectConversation(
      ownerId,
      conversationRequest.userIds[0],
    )

    if (existingConversation) {
      return this.getById(existingConversation.id)
    }

    const conversation = new Conversation({
      ...conversationRequest,
      ownerId,
      type: this.getConversationType(conversationRequest.userIds),
    })

    conversation.users = await this.usersService.findByIds(
      conversationRequest.userIds.concat(ownerId),
    )
    const createdConversation = await this.conversationsRepo.save(conversation)
    await this.createRelations(createdConversation)

    return new ConversationResponseDto(createdConversation)
  }

  updateLastMessage(conversationId: number, lastMessage: Message) {
    const set = { lastMessage }
    const where = { id: conversationId }
    return this.conversationsRepo.update(where, set)
  }

  getDirectConversation(ownerId: number, toUserId: number) {
    return this.conversationsRepo.createQueryBuilder('conversation')
      .leftJoin('conversation.users', 'user')
      .where('conversation.type = :type', { type: ConversationType.Direct })
      .andWhere('user.id IN (:...userIds)', { userIds: [toUserId, ownerId] })
      .groupBy('conversation.id')
      .having('count(conversation.id) = 2')
      .getOne()
  }
}
