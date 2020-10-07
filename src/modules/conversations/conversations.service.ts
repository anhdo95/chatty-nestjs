import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Conversation, ConversationType } from '@/database/entities/conversation.entity'
import { ConversationResponseDto, ConversationRequestDto } from './dtos/conversation.dto'
import { ConversationInfoService } from '../conversation-info/conversation-info.service'

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationsRepo: Repository<Conversation>,

    private readonly conversationInfoService: ConversationInfoService,
  ) {}

  async getById(id: string): Promise<ConversationResponseDto> {
    const conversation = await this.conversationsRepo.findOne(id)

    if (!conversation) {
      throw new NotFoundException('Conversation is not found!')
    }

    return new ConversationResponseDto(conversation)
  }

  getUserConversations(userId: string): Promise<Conversation[]> {
    return this.conversationsRepo.find({
      where: { $or: [{ ownerId: userId }, { userIds: { $elemMatch: { $eq: userId } } }] },
    })
  }

  getConversationType(userIds: string[]) {
    return userIds.length > 1 ? ConversationType.Channel : ConversationType.Direct
  }

  async create(
    conversationRequest: ConversationRequestDto,
    ownerId: string,
  ): Promise<ConversationResponseDto> {
    const conversation = new Conversation({
      ...conversationRequest,
      ownerId,
      type: this.getConversationType(conversationRequest.userIds),
    })

    const createdConversation = await this.conversationsRepo.save(conversation)
    await Promise.all(
      createdConversation.userIds.map(userId =>
        this.conversationInfoService.create({
          conversationId: createdConversation._id.toString(),
          userId,
        }),
      ),
    )

    return new ConversationResponseDto(createdConversation)
  }
}
