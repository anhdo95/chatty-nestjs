import { Injectable } from '@nestjs/common'

import { FileResponseDto } from './dtos/file.dto'
import { AppConfigService } from '@/shared/services/app-config.service'

@Injectable()
export class FilesService {
  constructor(private readonly config: AppConfigService) {}

  getImagePath(imageUrl: string): string {
    return `${this.config.domain}/files/images/${imageUrl}`
  }

  getTempImagePath(imageUrl: string): string {
    return `${this.config.domain}/files/images/temp/${imageUrl}`
  }

  getTempImage(file: Express.Multer.File): FileResponseDto {
    return {
      originalname: file.originalname,
      filename: file.filename,
      path: this.getTempImagePath(file.filename),
    }
  }

  getTempImages(files: Express.Multer.File[]): FileResponseDto[] {
    return files.map(this.getTempImage)
  }
}
