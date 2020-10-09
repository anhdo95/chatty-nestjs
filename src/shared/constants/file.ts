import * as path from 'path'

export const MAX_UPLOADABLE_COUNT = 20

export const ROOT_PATH = path.resolve(process.cwd())
export const TEMP_IMAGE_PATH = path.join(ROOT_PATH, '/assets/images/temp')
export const IMAGE_PATH = path.join(ROOT_PATH, '/assets/images')
