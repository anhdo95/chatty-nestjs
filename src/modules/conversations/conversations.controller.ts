import {
  Controller,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  Body,
  Post,
  Param,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { ConversationsService } from './conversations.service'
import { ConversationResponseDto, ConversationRequestDto } from './dtos/conversation.dto'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { User } from '@/decorators/user.decorator'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'
import { ConversationsRequestDto, ConversationsResponseDto } from './dtos/conversations.dto'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('conversations')
@ApiTags('Conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ConversationsResponseDto })
  @Get()
  getConversations(@Param() params: ConversationsRequestDto, @User() user: LoggedInUser) {
    return this.conversationsService.getUserConversations(user.userId, params)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ConversationResponseDto })
  @Post()
  createConversation(@Body() conversation: ConversationRequestDto, @User() user: LoggedInUser) {
    return this.conversationsService.create(conversation, user.userId)
  }
}
