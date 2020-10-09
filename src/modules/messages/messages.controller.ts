import { Controller, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { MessagesService } from './messages.service'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('messages')
@ApiTags('Messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService
  ) {}
}
