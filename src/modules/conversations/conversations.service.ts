import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Conversation } from '@/database/entities/conversation.entity'

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepo: Repository<Conversation>,
  ) {}

  async getByUserId(userId: string): Promise<Conversation[]> {
    return this.conversationsRepo.find({
      where: { userIds: { $elemMatch: { $eq: userId } } }
    })
  }

  async create(conversation: any): Promise<void> {
    await this.conversationsRepo.save(conversation)
  }
}
