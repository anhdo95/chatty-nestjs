import { Transform } from 'class-transformer'

/**
 * @description trim spaces from start and end.
 * @example
 * @ApiProperty()
 * @IsString()
 * @Trim()
 * name: string;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export function Trim() {
  return Transform((value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.map((v) => v.trim())
    }
    return value.trim()
  })
}
/**
 * @description trim spaces from start and end.
 * @example
 * @ApiProperty()
 * @IsString()
 * @Lowercased()
 * name: string;
 * @constructor
 */
export function Lowercase() {
  return Transform((value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.map((v) => v.toLowerCase())
    }
    return value.toLowerCase()
  })
}
