import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get domain(): string {
    return this.configService.get('DOMAIN') as string
  }

  get basePath(): string {
    return this.configService.get('BASE_PATH') as string
  }

  get port(): number {
    return this.configService.get('PORT') as number
  }

  get jwtSecret(): string {
    return this.configService.get('JWT_SECRET') as string
  }
  
  get jwtExpiresIn(): string {
    return this.configService.get('JWT_EXPIRES_IN') as string
  }

  get mongo() {
    return {
      name: this.configService.get('MONGO_NAME') as string,
      host: this.configService.get('MONGO_HOST') as string,
      port: this.configService.get('MONGO_PORT') as number,
      user: this.configService.get('MONGO_USER') as string,
      pass: this.configService.get('MONGO_PASS') as string,
      db: this.configService.get('MONGO_DB') as string,
    }
  }
}