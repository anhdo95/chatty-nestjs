import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService
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
}
