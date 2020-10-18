import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from '@/database/entities/user.entity'
import { FriendsModule } from '@/modules/friends/friends.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), FriendsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule {}
