import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BookDTO{
    @ApiProperty({ description: 'The title of the book' })
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @ApiProperty({ description: 'The author of the book' })
    @IsNotEmpty()
    @IsString()
    author: string;
  
    @ApiProperty({ description: 'The description for the book'})
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiPropertyOptional({ description: 'The synopsis number of the book' })
    @IsOptional()
    @IsString()
    synopsis?: string;
  
    @ApiPropertyOptional({ description: 'SLNo of the Book' })
    @IsOptional()
    @IsString()
    slNo:string;
  
    @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Book image file' })
    @IsOptional()
    image?: Express.Multer.File | string;
}
