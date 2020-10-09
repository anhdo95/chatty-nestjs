import { IsOptional, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class PageableRequestDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ required: false, default: 10 })
  limit: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ required: false, default: 0 })
  offset: number
}

export class PageableResponseDto {
  @ApiProperty()
  totalItems: number
}