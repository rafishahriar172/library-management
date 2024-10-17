import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class LoginDto {
  @ApiProperty({ description: 'Login email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Login Password' })
  @IsNotEmpty()
  password: string;
}
