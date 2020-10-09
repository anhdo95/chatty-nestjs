import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  UploadedFile,
  UploadedFiles,
  Get,
  Param,
  Res,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { FilesService } from './files.service'
import { FileInterceptor } from '@/interceptors/file.interceptor'
import { FilesInterceptor } from '@/interceptors/files.interceptor'
import { IMAGE_PATH, TEMP_IMAGE_PATH } from '@/shared/constants/file'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('images/:path')
  getImage(@Param('path') path: string, @Res() res: Response) {
    return res.sendFile(path, { root: IMAGE_PATH })
  }

  @Get('images/temp/:path')
  getTempImage(@Param('path') path: string, @Res() res: Response) {
    return res.sendFile(path, { root: TEMP_IMAGE_PATH })
  }

  @UseInterceptors(FileInterceptor)
  @Post('image') 
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.getTempImage(file)
  }

  @UseInterceptors(FilesInterceptor)
  @Post('images')
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return this.filesService.getTempImages(files)
  }
}
