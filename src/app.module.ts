import { Module } from '@nestjs/common'

import { AuthModule } from '@/modules/auth/auth.module'
import { DatabaseModule } from '@/database/database.module'
import { UsersModule } from '@/modules/users/users.module'
import { MessagesModule } from '@/modules/messages/messages.module'
import { SharedModule } from '@/shared/shared.module'

@Module({
  imports: [SharedModule, DatabaseModule, AuthModule, UsersModule, MessagesModule],
})
export class AppModule {}
