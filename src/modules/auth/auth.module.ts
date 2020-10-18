import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { FriendsModule } from '@/modules/friends/friends.module'
import { UsersService } from '@/modules/users/users.service'
import { configService } from '@/shared/services/config.service'
import { User } from '@/database/entities/user.entity'

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    FriendsModule,
    PassportModule,
    JwtModule.register({
      secret: configService.jwt.secret,
      signOptions: { expiresIn: configService.jwt.expiresIn },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
