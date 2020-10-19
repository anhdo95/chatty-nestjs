import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Friend } from '@/database/entities/friend.entity'
import { FriendsRequestDto, FriendsResponseDto } from './dtos/friends.dto'
import { FriendRequestDto } from './dtos/friend.dto'

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepo: Repository<Friend>,
  ) {}

  async create(friend: FriendRequestDto): Promise<Friend> {
    const createdFriend = await this.friendsRepo.save(friend)
    return this.findById(createdFriend.id)
  }

  async findById(id: number): Promise<Friend> {
    const friend = await this.friendsRepo
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.toUser', 'toUser')
      .where('friend.id = :id', { id })
      .getOne()

    if (!friend) {
      throw new NotFoundException('Friend not found!')
    }

    return new Friend(friend)
  }

  async getFriendsByFromUser(
    params: FriendsRequestDto,
    fromUserId: number,
  ): Promise<FriendsResponseDto> {
    const userQuery = this.friendsRepo
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.toUser', 'toUser')
      .where('friend.fromUserId = :fromUserId', { fromUserId })
      .orderBy('friend.createdAt', 'DESC')

    if (params.offset) {
      userQuery.skip(params.offset)
    }

    if (params.limit) {
      userQuery.take(params.limit)
    }

    const [items, count] = await userQuery.getManyAndCount()

    return new FriendsResponseDto({ items, totalItems: count })
  }

  async findToUserIdsFromUserId(fromUserId: number): Promise<number[]> {
    const friends = await this.friendsRepo.find({
      where: { fromUserId },
      select: ['toUserId'],
    })

    return friends.map(friend => friend.toUserId)
  }
}
