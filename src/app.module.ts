import { Module } from '@nestjs/common'

import { AuthModule } from '@/modules/auth/auth.module'
import { DatabaseModule } from '@/database/database.module'
import { UsersModule } from '@/modules/users/users.module'
import { FriendsModule } from '@/modules/friends/friends.module'
import { MessagesModule } from '@/modules/messages/messages.module'
import { ConversationsModule } from '@/modules/conversations/conversations.module'
import { ConversationInfoModule } from '@/modules/conversation-info/conversation-info.module'
import { FilesModule } from '@/modules/files/files.module'
import { SharedModule } from '@/shared/shared.module'

@Module({
  imports: [
    SharedModule,
    FilesModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    FriendsModule,
    ConversationsModule,
    ConversationInfoModule,
    MessagesModule,
  ],
})
export class AppModule {}
