import { ApiProperty } from '@nestjs/swagger'
import { PageableRequestDto, PageableResponseDto } from '@/shared/dtos/pageable.dto'
import { Friend } from '@/database/entities/friend.entity'

export class FriendsRequestDto extends PageableRequestDto {
  @ApiProperty()
  term: string
}

export class FriendsResponseDto extends PageableResponseDto {
  @ApiProperty({ type: Friend, isArray: true })
  items: Friend[]

  constructor(response: { items: Friend[], totalItems: number }) {
    super()

    this.items = response.items.map(item => new Friend(item))
    this.totalItems = response.totalItems
  }
}
