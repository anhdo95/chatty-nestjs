import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppConfigService } from '@/shared/services/app-config.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: AppConfigService) => {
        return {
          type: 'mongodb',
          host: config.mongo.host,
          port: config.mongo.port,
          username: config.mongo.user,
          password: config.mongo.pass,
          database: config.mongo.db,
          entities: [__dirname + '/entities/*.entity.{ts,js}'],
          synchronize: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          migrationsRun: true,
          migrations: [__dirname + '/migrations/*.{ts,js}'],
        }
      },
      inject: [ AppConfigService ],
    })
  ],
  exports: [],
})

export class DatabaseModule {}
