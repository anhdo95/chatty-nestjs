import { Module } from '@nestjs/common'

import { MessagesGateway } from './messages.gateway'
import { MessagesService } from './messages.service'
import { AuthModule } from '@/modules/auth/auth.module'
import { ConversationsModule } from '@/modules/conversations/conversations.module'

@Module({
  imports: [AuthModule, ConversationsModule],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
