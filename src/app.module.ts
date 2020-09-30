import { Module } from '@nestjs/common'

import { AuthModule } from '@/modules/auth/auth.module'
import { UsersModule } from '@/modules/users/users.module'
import { SharedModule } from '@/shared/shared.module'

@Module({
  imports: [SharedModule, AuthModule, UsersModule],
})
export class AppModule {}
