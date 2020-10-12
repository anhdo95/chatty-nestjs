import {
  Controller,
  Get,
  Request,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { User } from '@/decorators/user.decorator'
import { UsersService } from './users.service'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@User() user: LoggedInUser) {
    return this.usersService.findOne(user.userId)
  }
}
