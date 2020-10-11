import { Socket } from 'socket.io'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { MessageRequestDto } from './dtos/message.dto'
import { MessagesRequestDto, MessagesResponseDto } from './dtos/messages.dto'
import { ConversationsService } from '@/modules/conversations/conversations.service'
import { JoiningInformation } from '@/interfaces/messages/join-information'
import { Message } from '@/database/entities/message.entity'

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepo: Repository<Message>,

    private readonly conversationsService: ConversationsService,
  ) {}

  async create(message: MessageRequestDto): Promise<Message> {
    const createdMessage = await this.messagesRepo.save(message)
    return new Message(createdMessage)
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

    socket.emit('message', { user: 'admin', text: 'Say hi to your friend' })
    socket.broadcast
      .to(joining.conversationId.toString())
      .emit('message', { user: 'admin', text: `${joining.user.name}, has joined!` })

    return conversation
  }
}
