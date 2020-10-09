import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { configService } from '@/shared/services/config.service'

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ],
  exports: [],
})

export class DatabaseModule {}
