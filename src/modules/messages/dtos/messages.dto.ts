import { PageableRequestDto, PageableResponseDto } from '@/shared/dtos/pageable.dto'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { MessageResponseDto } from './message.dto'
import { Message } from '@/database/entities/message.entity'
import { Type } from 'class-transformer'

export class MessagesRequestDto extends PageableRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  conversationId: number
}

export class MessagesResponseDto extends PageableResponseDto {
  @ApiProperty()
  items: MessageResponseDto[]

  constructor(response: { items: Message[], totalItems: number }) {
    super()

    this.items = response.items.map(item => new MessageResponseDto(item))
    this.totalItems = response.totalItems
  }
}