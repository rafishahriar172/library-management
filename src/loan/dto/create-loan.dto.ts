/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanDto {
  @ApiProperty({ example: 'user-id', description: 'The ID of the user borrowing the book' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: 'book-id', description: 'The ID of the book being borrowed' })
  @IsNotEmpty()
  @IsString()
  bookId: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z', description: 'The loan date' })
  @IsNotEmpty()
  @IsDateString()
  loanDate: string;
}
