import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { LocalAuthGuard } from '@/guards/local-auth.guard'
import { AuthService } from './auth.service'
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: RegisterResponseDto })
  @Post('register')
  register(@Body() body: RegisterRequestDto) {
    return this.authService.register(body)
  }
}
