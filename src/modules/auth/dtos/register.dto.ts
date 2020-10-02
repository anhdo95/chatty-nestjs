import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator'

import { Trim, Lowercase } from '@/decorators/transforms.decorator'
import { User } from '@/database/entities/user.entity'

export class RegisterRequestDto {
  @Trim()
  @MaxLength(50)
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @Trim()
  @Lowercase()
  @IsEmail({ 'allow_utf8_local_part': false }, { message: 'Email is invalid format' })
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(32, { message: 'Password must be at maximum 32 characters' })
  @ApiProperty({ minLength: 6, maxLength: 32 })
  password: string
}

export class RegisterResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  constructor(user: User) {
    this.id = user._id.toString()
    this.name = user.name
    this.email = user.email
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}