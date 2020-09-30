import { Controller, Get, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(@Request() req: any) {
    this.usersService.getHello()
    return req.user
  }
}
