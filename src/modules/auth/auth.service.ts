import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'

import { LoginResponseDto } from './dtos/login.dto'
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto'
import { LoggedInUser } from '@/interfaces/users/logged-in-user'
import { JwtPayload } from '@/interfaces/auth/jwt-payload'
import { User } from '@/database/entities/user.entity'
import { PasswordUtil } from '@/utils/password.util'

@Injectable()
export class AuthService {
  constructor(
    // private config: AppConfigService,
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
  async validateUser(email: string, password: string): Promise<LoggedInUser> {
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
   * Whether a token is valid or not
   * @param token request token
   * @return decoded user's token information
   */
  async verifyUser(token: string): Promise<LoggedInUser> {
    const decoded: JwtPayload = this.jwtService.verify(token)
    const user = await this.userRepo.findOne(decoded.sub)

    if (!user) {
      throw new NotFoundException()
    }
    
    return {
      userId: decoded.sub,
      email: decoded.email
    }
  }

  /**
   * Processes authentication and returns an access token
   * @param user a user properties to sign and generate a token
   * @return logged-in information including a token
   */
  async login(user: LoggedInUser): Promise<LoginResponseDto> {
    const payload: JwtPayload = { email: user.email, sub: user.userId }
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
