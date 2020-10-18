import { ApiProperty } from '@nestjs/swagger'
import { PageableRequestDto, PageableResponseDto } from '@/shared/dtos/pageable.dto'
import { User } from '@/database/entities/user.entity'

export class UsersRequestDto extends PageableRequestDto {
  @ApiProperty()
  term: string
}

export class UsersResponseDto extends PageableResponseDto {
  @ApiProperty({ type: User, isArray: true })
  items: User[]

  constructor(response: { items: User[], totalItems: number }) {
    super()

    this.items = response.items.map(item => new User(item))
    this.totalItems = response.totalItems
  }
}
