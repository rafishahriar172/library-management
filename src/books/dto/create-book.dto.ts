/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'book title', description: 'The title of the book' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'book author', description: 'The author of the book' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ example: 'book description', description: 'The description of the book' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'book image', description: 'The image of the book' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  imageFile: any;

  @ApiProperty({ example: 'book sl', description: 'The slNo of the book' })
  @IsNotEmpty()
  @IsString()
  slNo: string;

  @ApiProperty({ example: 'book synopsis', description: 'The synopsis of the book' })
  @IsOptional()
  @IsString()
  synopsis?: string;
}
