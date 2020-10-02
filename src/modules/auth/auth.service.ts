import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'

import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto'
import { User } from '@/database/entities/user.entity'
import { PasswordUtil } from '@/utils/password.util'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  validateUser(email: string, password: string): Promise<any> {
    return Promise.resolve({
      userId: Date.now(),
      email
    })
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  /**
   * Creates a new user and returns the one created
   * @param user requested user information
   * @return the registered user's insensitive information
   */
  async register(user: RegisterRequestDto): Promise<RegisterResponseDto> {
    user.password = PasswordUtil.hash(user.password)
    const registeredUser: User = await this.userRepo.save(user)

    return new RegisterResponseDto(registeredUser)
  }
}
