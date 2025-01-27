/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'User email address', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'User password (must meet strong password criteria)', 
    example: 'P@ssw0rd123!' 
  })
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;
}
