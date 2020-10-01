import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'

import { AuthService } from './auth.service'
import { UsersService } from '@/modules/users/users.service'

import { AppConfigService } from '@/shared/services/app-config.service'
import { User } from '@/database/entities/user.entity'

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory(config: AppConfigService) {
        return {
          secret: config.jwtSecret,
          signOptions: { expiresIn: config.jwtExpiresIn },
        }
      },
      inject: [AppConfigService]
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
