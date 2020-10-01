import { Controller, Request, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { LocalAuthGuard } from '@/guards/local-auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Post('register')
  register() {
    return this.authService.register()
  }
}
