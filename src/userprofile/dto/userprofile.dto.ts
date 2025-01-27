/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserProfileDto {
  @ApiProperty({ example: 'user name', description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'user id', description: 'The userId' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: 'user image', description: 'The image of the user' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 'user zip', description: 'The bio of the user' })
  @IsOptional()
  @IsString()
  zip?: string;

  @ApiProperty({ example: 'user address', description: 'The address of the user' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'user city', description: 'The city of the user' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'user state', description: 'The state of the user' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: 'user phone', description: 'The phone of the user' })
  @IsOptional()
  @IsString()
  phone?: string;
}