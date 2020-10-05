import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator'

import { Trim, Lowercase } from '@/decorators/transforms.decorator'
import { User } from '@/database/entities/user.entity'

export class LoginRequestDto {
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

export class LoggedInUserDto {
  userId: string
  email: string
}

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string
}