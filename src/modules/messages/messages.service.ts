import { Socket } from 'socket.io'
import { Repository } from 'typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { MessageRequestDto, MessageResponseDto } from './dtos/message.dto'
import { MessagesRequestDto, MessagesResponseDto } from './dtos/messages.dto'
import { ConversationsService } from '@/modules/conversations/conversations.service'
import { UsersService } from '@/modules/users/users.service'
import { JoiningInformation } from '@/interfaces/messages/join-information'
import { Message } from '@/database/entities/message.entity'
import { User } from '@/database/entities/user.entity'

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepo: Repository<Message>,

    private readonly conversationsService: ConversationsService,
  ) {}

  async create(message: MessageRequestDto): Promise<Message> {
    const createdMessage = await this.messagesRepo.save(message)
    return this.findOne(createdMessage.id)
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messagesRepo.createQueryBuilder('message')
      .leftJoinAndSelect('message.user', 'user')
      .where('message.id = :id', { id })
      .getOne()

    if (!message) {
      throw new NotFoundException('Message is not found!')
    }

    return message
  }

  async getMessages(params: MessagesRequestDto): Promise<MessagesResponseDto> {
    const messagesQuery = this.messagesRepo
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.user', 'user')
      .where('message.conversationId = :conversationId', { conversationId: params.conversationId })
      .orderBy('message.createdAt', 'DESC')

    if (params.offset) {
      messagesQuery.skip(params.offset)
    }

    if (params.limit) {
      messagesQuery.take(params.limit)
    }
    
    const [items, count] = await messagesQuery.getManyAndCount()
    return new MessagesResponseDto({ items, totalItems: count })
  }

  async joinConversation(socket: Socket, joining: JoiningInformation) {
    const conversation = await this.conversationsService.getById(joining.conversationId)
    if (!conversation) return

    socket.broadcast.to(joining.conversationId.toString())
    socket.join(joining.conversationId.toString())

    return conversation
  }

  async sendMessage(socket: Socket, message: MessageRequestDto) {
    const createdMessage = await this.create(message)
    console.log('createdMessage', createdMessage)

    socket.to(message.conversationId.toString()).emit('message', createdMessage)
    socket.emit('message', createdMessage)
  }
}
