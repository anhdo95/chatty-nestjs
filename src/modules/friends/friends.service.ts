import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Friend } from '@/database/entities/friend.entity'
import { FriendRequestDto } from './dtos/friend.dto'

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepo: Repository<Friend>,
  ) {}

  async create(friend: FriendRequestDto): Promise<Friend> {
    return this.friendsRepo.save(friend)
  }

  async findToUserIdsFromUserId(fromUserId: number): Promise<number[]> {
    const friends = await this.friendsRepo.find({ 
      where: { fromUserId },
      select: ['toUserId']
    })

    return friends.map(friend => friend.toUserId)
  }
}
