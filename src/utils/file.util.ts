import * as path from 'path'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { StorageEngine, diskStorage } from 'multer'

import { TEMP_IMAGE_PATH } from '@/common/constants/file'

export class FileUtil {
  static customizeFileName(
    req: any,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ): void {
    const fileExtName = path.extname(file.originalname)
    const fileName = uuidv4() + fileExtName

    callback(null, fileName)
  }

  static getImageStorage(): StorageEngine {
    return diskStorage({
      destination(
        req: any,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void,
      ) {
        if (!fs.existsSync(TEMP_IMAGE_PATH)) {
          fs.mkdirSync(TEMP_IMAGE_PATH, { recursive: true })
        }

        callback(null, TEMP_IMAGE_PATH)
      },
      filename: FileUtil.customizeFileName,
    })
  }

  static getImageFilter() {
    return (
      req: any,
      file: Express.Multer.File,
      callback: (error: Error | null, acceptFile: boolean) => void,
    ): void => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false)
      }
      callback(null, true)
    }
  }
}