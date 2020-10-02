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
import { LoginResponseDto } from './dtos/login.dto'
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user)
  }

  
  @ApiOkResponse({ type: RegisterResponseDto })
  @Post('register')
  register(@Body() body: RegisterRequestDto) {
    return this.authService.register(body)
  }
}
