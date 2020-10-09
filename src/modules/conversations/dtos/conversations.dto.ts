import { ApiProperty } from '@nestjs/swagger'
import { PageableRequestDto, PageableResponseDto } from '@/shared/dtos/pageable.dto'
import { ConversationResponseDto } from './conversation.dto'
import { Conversation } from '@/database/entities/conversation.entity'

export class ConversationsRequestDto extends PageableRequestDto {}

export class ConversationsResponseDto extends PageableResponseDto {
  @ApiProperty({ type: ConversationResponseDto, isArray: true })
  items: ConversationResponseDto[]

  constructor(response: { items: Conversation[], totalItems: number }) {
    super()

    this.items = response.items.map(item => new ConversationResponseDto(item))
    this.totalItems = response.totalItems
  }
}
