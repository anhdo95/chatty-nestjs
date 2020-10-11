import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { MessagesService } from './messages.service'
import { MessagesRequestDto, MessagesResponseDto } from './dtos/messages.dto'
import { User } from '@/decorators/user.decorator'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { MessageRequestDto } from './dtos/message.dto'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('messages')
@ApiTags('Messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MessagesResponseDto })
  @Get()
  getMessages(@Query() query: MessagesRequestDto) {
    return this.messagesService.getMessages(query)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: MessageRequestDto, @User() user: LoggedInUser) {
    body.userId = user.userId
    return this.messagesService.create(body)
  }
}
