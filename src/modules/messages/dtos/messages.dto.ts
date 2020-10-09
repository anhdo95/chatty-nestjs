import { PageableRequestDto, PageableResponseDto } from '@/shared/dtos/pageable.dto'
import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '@/database/entities/user.entity'

export class MessagesRequestDto extends PageableRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  conversationId: number
}

export class MessagesResponseDto extends PageableResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  user: User
}