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

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  async create(): Promise<User> {
    const newUser = {
      email: 'admin@chatty.com',
      name: 'Admin'
    }

    const createdUser = await this.usersRepo.save(newUser)
    return createdUser
  }

  async remove(id: string): Promise<void> {
    await this.usersRepo.delete(id)
  }
}
