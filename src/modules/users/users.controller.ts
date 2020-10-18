import {
  Controller,
  Get,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { User } from '@/decorators/user.decorator'
import { UsersService } from './users.service'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'
import { UsersResponseDto, UsersRequestDto } from './dtos/users.dto'

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

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UsersResponseDto })
  @Get('unfriended')
  getUnfriendedUsers(@Query() params: UsersRequestDto, @User() user: LoggedInUser) {
    return this.usersService.getUnfriendedUsers(params, user.userId)
  }
}
