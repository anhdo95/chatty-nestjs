import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

import { AppConfigService } from '@/shared/services/app-config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(AppConfigService)

  const options = new DocumentBuilder()
    .setTitle('Chatty API Docs')
    .setVersion('1.0')
    .addServer(config.basePath)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  
  await app.listen(config.port, () =>
    console.log(`Server is running on ${config.port}`),
  )
}
bootstrap()
