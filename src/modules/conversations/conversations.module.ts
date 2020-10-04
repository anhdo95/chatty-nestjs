import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConversationsService } from './conversations.service'
import { Conversation } from '@/database/entities/conversation.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  providers: [ConversationsService],
  exports: [ConversationsService],
})

export class ConversationsModule {}
