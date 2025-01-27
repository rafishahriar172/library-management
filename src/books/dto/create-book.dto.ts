/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby', description: 'The title of the book' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'The author of the book' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ 
    example: 'A classic novel set in the 1920s', 
    description: 'A brief description of the book (optional)' 
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    example: 'https://example.com/image.jpg', 
    description: 'A URL to the image of the book (optional)' 
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: '12345', description: 'The unique serial number of the book' })
  @IsNotEmpty()
  @IsString()
  slNo: string;

  @ApiProperty({ 
    example: 'A deeper look into the themes of the novel', 
    description: 'A detailed synopsis of the book (optional)' 
  })
  @IsOptional()
  @IsString()
  synopsis?: string;

  @ApiProperty({ 
    example: ['fiction', 'classic'], 
    description: 'An array of category IDs associated with the book' 
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  categoryIds: string[]; // Array of category IDs
}
