import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MessagesGateway } from './messages.gateway'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { AuthModule } from '@/modules/auth/auth.module'
import { ConversationsModule } from '@/modules/conversations/conversations.module'
import { Message } from '@/database/entities/message.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Message]), AuthModule, ConversationsModule],
  controllers: [MessagesController],
  providers: [MessagesGateway, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
