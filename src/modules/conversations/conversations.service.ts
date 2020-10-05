import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Conversation, ConversationType } from '@/database/entities/conversation.entity'
import { NewConversation } from '@/interfaces/conversations/new-conversation'
import { ConversationResponseDto } from './dtos/conversation.dto'
import { ConversationInfoService } from '../conversation-info/conversation-info.service'

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationsRepo: Repository<Conversation>,

    private readonly conversationInfoService: ConversationInfoService
  ) {}

  getUserConversations(userId: string): Promise<Conversation[]> {
    return this.conversationsRepo.find({
      where: { $or: [{ ownerId: userId }, { userIds: { $elemMatch: { $eq: userId } } }] },
    })
  }

  async create(conversation: NewConversation): Promise<ConversationResponseDto> {
    if (conversation.userIds.length > 1) {
      conversation.type = ConversationType.Channel
    }

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
