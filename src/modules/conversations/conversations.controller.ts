import {
  Controller,
  Request,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { ConversationsService } from './conversations.service'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'

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
}
