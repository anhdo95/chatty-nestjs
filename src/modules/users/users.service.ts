import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UsersRequestDto, UsersResponseDto } from './dtos/users.dto'
import { User } from '@/database/entities/user.entity'
import { FriendsService } from '@/modules/friends/friends.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,

    private readonly friendsService: FriendsService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.find()
  }

  findByIds(ids: number[]) {
    return this.usersRepo.findByIds(ids)
  }

  async findOneEntity(id: number): Promise<User> {
    const user = await this.usersRepo.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  async findOne(id: number): Promise<User> {
    const user = await this.findOneEntity(id)
    return new User(user)
  }

  async getUnfriendedUsers(params: UsersRequestDto, userId: number): Promise<UsersResponseDto> {
    const friendIds = await this.friendsService.findToUserIdsFromUserId(userId)

    const userQuery = this.usersRepo
      .createQueryBuilder('user')
      .where('user.id NOT IN (:...friendIds)', { friendIds })
      .orderBy('user.createdAt', 'DESC')

    if (params.term) {
      userQuery.andWhere(`user.name ILIKE '%${params.term}%'`)
    }

    if (params.offset) {
      userQuery.skip(params.offset)
    }

    if (params.limit) {
      userQuery.take(params.limit)
    }

    const [items, count] = await userQuery.getManyAndCount()

    return new UsersResponseDto({ items, totalItems: count })
  }

  async remove(id: number): Promise<void> {
    await this.usersRepo.delete(id)
  }
}
