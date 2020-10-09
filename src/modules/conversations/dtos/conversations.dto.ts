import { ApiProperty } from '@nestjs/swagger'
import { PageableRequestDto, PageableResponseDto } from '@/shared/dtos/pageable.dto'
import { ConversationResponseDto } from './conversation.dto'

export class ConversationsRequestDto extends PageableRequestDto {}

export class ConversationsResponseDto extends PageableResponseDto {
  @ApiProperty({ type: ConversationResponseDto, isArray: true })
  items: ConversationResponseDto[]
}
