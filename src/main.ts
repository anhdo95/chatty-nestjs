import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '@/app.module'
import { configService } from '@/shared/services/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
    .setTitle('Chatty API Docs')
    .setVersion('1.0')
    .addServer(configService.basePath)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe)

  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Language', 'Content-Disposition'],
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    exposedHeaders: ['Content-Disposition']
  })
  
  await app.listen(configService.port, () =>
    console.log(`Server is running on ${configService.port}`),
  )
}
bootstrap()
