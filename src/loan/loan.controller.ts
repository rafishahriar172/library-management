/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Put,
    Param,
    Body,
    NotFoundException,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { LoanService } from './loan.service';
  import { CreateLoanDto } from './dto/create-loan.dto';
  import { Loan } from '@prisma/client';
  
  @ApiTags('Loans')
  @Controller('loans')
  export class LoanController {
    constructor(private readonly loanService: LoanService) {}
  
    // List all loans (Admin only)
    @Get()
    async getAllLoans(): Promise<Loan[]> {
      return await this.loanService.getAllLoans();
    }
  
    // Get loan details by ID (Admin or the loan's borrower)
    @Get(':id')
    async getLoanById(@Param('id') id: string): Promise<Loan> {
      const loan = await this.loanService.getLoanById(id);
      if (!loan) {
        throw new NotFoundException(`Loan with ID ${id} not found`);
      }
      return loan;
    }
  
    // Borrow a book (Member only)
    @Post()
    async borrowBook(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
      return await this.loanService.borrowBook(createLoanDto);
    }
  
    // Return a book (Member only)
    @Put(':id/return')
    async returnBook(@Param('id') id: string): Promise<Loan> {
      return await this.loanService.returnBook(id);
    }
  
    // Get fine details for a loan (Admin or the loan's borrower)
    @Get(':id/fine')
    async getFineDetails(@Param('id') id: string): Promise<{ fine: number }> {
      return await this.loanService.getFineDetails(id);
    }
  }
  