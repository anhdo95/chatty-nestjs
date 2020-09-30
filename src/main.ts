import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { AppConfigService } from '@/shared/services/app-config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const appConfigService = app.get(AppConfigService)
  
  await app.listen(appConfigService.port, () =>
    console.log(`Server is running on ${appConfigService.port}`),
  )
}
bootstrap()
