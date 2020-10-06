import { ApiProperty } from '@nestjs/swagger'

export class FileResponseDto {
  @ApiProperty()
  originalname: string

  @ApiProperty()
  filename: string

  @ApiProperty()
  path: string
}
