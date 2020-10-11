import { ApiProperty } from '@nestjs/swagger'

import { IsNotEmpty } from 'class-validator'
import { Message } from '@/database/entities/message.entity'
import { User } from '@/database/entities/user.entity'

export class MessageRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  conversationId: number

  @ApiProperty()
  userId?: number

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
  user?: User

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  constructor(message: Message) {
    this.id = message.id
    this.user = message.user && new User(message.user)
    this.content = message.content
    this.createdAt = message.createdAt
    this.updatedAt = message.updatedAt
  }
}