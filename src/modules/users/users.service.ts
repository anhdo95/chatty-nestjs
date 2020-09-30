import { Injectable } from '@nestjs/common'
import { AppConfigService } from '@/shared/services/app-config.service'

@Injectable()
export class UsersService {

  constructor(private readonly configService: AppConfigService) {
  }

  getHello(): string {
    console.log('000', this.configService.jwtSecret)
    return 'Hello World! Hello'
  }
}
