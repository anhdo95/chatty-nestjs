import { IsOptional, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PageableRequestDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, default: 10 })
  limit: number

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, default: 0 })
  offset: number
}

export class PageableResponseDto {
  @ApiProperty()
  totalItems: number
}