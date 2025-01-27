/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Fiction', description: 'The genre of the category' })
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty({ example: 'Paperback', description: 'The type of the category (optional)' })
  @IsOptional()
  @IsString()
  type?: string;
}
