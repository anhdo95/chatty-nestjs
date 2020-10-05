import { ApiProperty } from '@nestjs/swagger'

import { Conversation, ConversationType } from '@/database/entities/conversation.entity'

export class ConversationResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  type: ConversationType

  @ApiProperty()
  ownerId: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  constructor(conversation: Conversation) {
    this.id = conversation._id.toString()
    this.name = conversation.name
    this.type = conversation.type
    this.ownerId = conversation.ownerId
    this.createdAt = conversation.createdAt
    this.updatedAt = conversation.updatedAt
  }
}