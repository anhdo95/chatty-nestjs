import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  validateUser(username: string, password: string): Promise<any> {
    return Promise.resolve({
      username
    })
  }
}
