import {
  Controller,
  Request,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  Body,
  Post,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { ConversationsService } from './conversations.service'
import { ConversationResponseDto } from './dtos/conversation.dto'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { User } from '@/decorators/user.decorator'
import { NewConversation } from '@/interfaces/conversations/new-conversation'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('conversations')
@ApiTags('Conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getConversations(@Request() req: any) {
    return this.conversationsService.getUserConversations(req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ConversationResponseDto })
  @Post()
  createConversation(@Body() conversation: NewConversation, @User() user: LoggedInUser) {
    conversation.ownerId = user.userId
    return this.conversationsService.create(conversation)
  }
}
