import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [PassportModule],
  exports: [AuthService],
})

export class AuthModule {}
