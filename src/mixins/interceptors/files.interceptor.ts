import { FilesInterceptor as ExpressFilesInterceptor } from '@nestjs/platform-express'
import { MAX_UPLOADABLE_COUNT } from '@/common/constants/file'
import { FileUtil } from '@/utils/file.util'

export const FilesInterceptor = ExpressFilesInterceptor('files', MAX_UPLOADABLE_COUNT, {
  storage: FileUtil.getImageStorage(),
  fileFilter: FileUtil.getImageFilter(),
})
