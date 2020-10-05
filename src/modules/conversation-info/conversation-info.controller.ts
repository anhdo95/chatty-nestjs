import {
  Controller,
  Request,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
} from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { ConversationInfoService } from './conversation-info.service'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('conversation-info')
@ApiTags('Conversation Info')
export class ConversationInfoController {
  constructor(private readonly converInfoService: ConversationInfoService) {}
}
