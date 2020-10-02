import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'

import { LoginResponseDto, LoggedInUserDto } from './dtos/login.dto'
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

  /**
   * Finds a matched user's email and password
   * and returns required information to implement Passport's local strategy
   * @param email a unique user's email
   * @param password a plain user's password
   * @return unique user information
   */
  async validateUser(email: string, password: string): Promise<LoggedInUserDto> {
    const user = await this.userRepo.findOne({ email })

    if (!user) {
      throw new NotFoundException()
    }

    if (!PasswordUtil.compare(password, user.password)) {
      throw new UnauthorizedException()
    }

    return {
      userId: user._id.toString(),
      email: user.email
    }
  }
  /**
   * Processes authentication and returns an access token
   * @param user a user properties to sign and generate a token
   * @return logged-in information including a token
   */
  async login(user: LoggedInUserDto): Promise<LoginResponseDto> {
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
    if (await this.isUserEmailExist(user.email)) {
      throw new BadRequestException('Email has already existed!')
    }

    user.password = PasswordUtil.hash(user.password)
    const registeredUser: User = await this.userRepo.save(user)

    return new RegisterResponseDto(registeredUser)
  }

  /**
   * Whether an email existed in the database
   * @param email a user's email
   * @return a flag to notice an email existed
   */
  async isUserEmailExist(email: string): Promise<boolean> {
    return !!await this.userRepo.count({ email })
  }
}
