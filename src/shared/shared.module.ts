import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppConfigService } from './services/app-config.service'

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AppConfigService],
  exports: [AppConfigService]
})

export class SharedModule {}
