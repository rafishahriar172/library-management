/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan, LoanStatus } from '@prisma/client';

@Injectable()
export class LoanService {
  constructor(private readonly prisma: PrismaService) {}

  // Fetch all loans
  async getAllLoans(): Promise<Loan[]> {
    return await this.prisma.loan.findMany({
      include: { Book: true, User: true },
    });
  }

  // Fetch loan by ID
  async getLoanById(id: string): Promise<Loan> {
    return await this.prisma.loan.findUnique({
      where: { id },
      include: { Book: true, User: true },
    });
  }

  // Borrow a book
  async borrowBook(createLoanDto: CreateLoanDto): Promise<Loan> {
    const { userId, bookId, loanDate } = createLoanDto;

    // Ensure book exists
    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // Create loan
    return await this.prisma.loan.create({
      data: {
        userId,
        bookId,
        loanDate,
        status: LoanStatus.BORROWED,
      },
    });
  }

  // Return a book
  async returnBook(id: string): Promise<Loan> {
    const loan = await this.prisma.loan.findUnique({ where: { id } });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    if (loan.status !== LoanStatus.BORROWED) {
      throw new ForbiddenException('Book is not currently borrowed');
    }

    return await this.prisma.loan.update({
      where: { id },
      data: { returnDate: new Date(), status: LoanStatus.RETURNED },
    });
  }

  // Calculate fine details
  async getFineDetails(id: string): Promise<{ fine: number }> {
    const loan = await this.prisma.loan.findUnique({ where: { id } });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    // Calculate fine (example: $1 per day overdue)
    const today = new Date();
    const loanDuration = 14; // 14 days loan period
    const dueDate = new Date(loan.loanDate);
    dueDate.setDate(dueDate.getDate() + loanDuration);

    const overdueDays =
      loan.returnDate && loan.returnDate > dueDate
        ? Math.floor((loan.returnDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
        : Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

    const fine = overdueDays > 0 ? overdueDays * 1 : 0; // $1 per overdue day
    return { fine };
  }
}
