import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConversationsController } from './conversations.controller'
import { ConversationsService } from './conversations.service'

import { Conversation } from '@/database/entities/conversation.entity'
import { UsersModule } from '@/modules/users/users.module'
import { ConversationInfoModule } from '@/modules/conversation-info/conversation-info.module'

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UsersModule, ConversationInfoModule],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})

export class ConversationsModule {}
