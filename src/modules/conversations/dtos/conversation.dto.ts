import { MaxLength, IsNotEmpty, ArrayNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { Trim } from '@/decorators/transforms.decorator'
import { Conversation, ConversationType } from '@/database/entities/conversation.entity'
import { MessageResponseDto } from '@/modules/messages/dtos/message.dto'
import { Message } from '@/database/entities/message.entity'

export class ConversationRequestDto {
  @IsNotEmpty()
  @Trim()
  @MaxLength(50)
  @ApiProperty()
  name: string

  @ArrayNotEmpty()
  @ApiProperty()
  userIds: number[]

  @Trim()
  @ApiProperty()
  coverPhoto: string
}

export class ConversationResponseDto {
  @ApiProperty()
  id: number
  
  @ApiProperty()
  name: string

  @ApiProperty()
  type: ConversationType

  @ApiProperty()
  coverPhoto: string

  @ApiProperty()
  lastMessage?: MessageResponseDto

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  constructor(conversation: Conversation) {
    this.id = conversation.id
    this.name = conversation.name
    this.type = conversation.type
    this.coverPhoto = conversation.coverPhoto
    this.lastMessage = new MessageResponseDto(conversation.lastMessage as Message)
    this.createdAt = conversation.createdAt
    this.updatedAt = conversation.updatedAt
  }
}