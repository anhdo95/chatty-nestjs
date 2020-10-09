import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AppConfigService } from '@/shared/services/app-config.service'
import { User } from '@/database/entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: AppConfigService,

    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.find()
  }

  findByIds(ids: number[]) {
    return this.usersRepo.findByIds(ids)
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepo.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    return new User(user)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepo.delete(id)
  }
}
