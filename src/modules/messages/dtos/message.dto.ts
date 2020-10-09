import { ApiProperty } from '@nestjs/swagger'

import { IsNotEmpty } from 'class-validator'
import { Message } from '@/database/entities/message.entity'

export class MessageRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  conversationId: number

  @IsNotEmpty()
  @ApiProperty()
  userId: number

  @IsNotEmpty()
  @ApiProperty()
  content: string
}

export class MessageResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  content: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  constructor(message: Message) {
    this.id = message.id
    this.content = message.content
    this.createdAt = message.createdAt
    this.updatedAt = message.updatedAt
  }
}