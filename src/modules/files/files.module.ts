import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'

import { FilesController } from './files.controller'
import { FilesService } from './files.service'

@Module({
  imports: [MulterModule],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService]
})

export class FilesModule {}
