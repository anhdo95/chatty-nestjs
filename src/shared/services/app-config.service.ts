import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get('PORT') as number
  }

  get jwtSecret(): string {
    return this.configService.get('JWT_SECRET') as string
  }
  
  get jwtExpiresIn(): string {
    return this.configService.get('JWT_EXPIRES_IN') as string
  }
}