import { ApiProperty } from '@nestjs/swagger'

import { FriendStatus, Friend } from '@/database/entities/friend.entity'

export class FriendRequestDto {
  @ApiProperty()
  fromUserId: number

  @ApiProperty()
  toUserId: number

  @ApiProperty({ default: FriendStatus.Follow })
  status: FriendStatus
}

export class FriendResponseDto {
  @ApiProperty()
  id: number
  
  @ApiProperty()
  fromUserId: number

  @ApiProperty()
  toUserId: number

  @ApiProperty()
  status: FriendStatus

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  constructor(friend: Friend) {
    this.id = friend.id
    this.fromUserId = friend.fromUserId
    this.toUserId = friend.toUserId
    this.status = friend.status
    this.createdAt = friend.createdAt
    this.updatedAt = friend.updatedAt
  }
}