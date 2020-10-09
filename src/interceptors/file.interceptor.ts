import { FileInterceptor as ExpressFileInterceptor } from '@nestjs/platform-express'
import { FileUtil } from '@/utils/file.util'

export const FileInterceptor = ExpressFileInterceptor('file', {
  storage: FileUtil.getImageStorage(),
  fileFilter: FileUtil.getImageFilter(),
})
