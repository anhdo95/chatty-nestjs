import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(username: string, password: string): Promise<any> {
    return Promise.resolve({
      username
    })
  }
}
