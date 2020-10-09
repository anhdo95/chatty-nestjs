import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ConversationInfo } from '@/database/entities/conversation-info.entity'
import { NewConversationInfo } from '@/interfaces/conversation-info/new-conversation-info'

@Injectable()
export class ConversationInfoService {
  constructor(
    @InjectRepository(ConversationInfo)
    private readonly conversationInfoRepo: Repository<ConversationInfo>,
  ) {}

  async create(conversationInfo: NewConversationInfo): Promise<ConversationInfo> {
    const createdConverInfo = await this.conversationInfoRepo.save(conversationInfo)
    return new ConversationInfo(createdConverInfo)
  }
}
