import {
  Controller,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { FriendRequestDto } from './dtos/friend.dto'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { FriendsService } from './friends.service'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'
import { Friend } from '@/database/entities/friend.entity'
import { User } from '@/decorators/user.decorator'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('friends')
@ApiTags('Friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Friend })
  @Post()
  create(@Body() body: FriendRequestDto, @User() user: LoggedInUser) {
    body.fromUserId = user.userId
    return this.friendsService.create(body)
  }
}
