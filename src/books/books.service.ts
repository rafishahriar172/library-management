/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { S3 } from 'aws-sdk';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
) {}

  async getAllBooks(page: number = 1, limit: number = 10) {
    const books = await this.prisma.book.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalCount = await this.prisma.book.count();
    return {
      data: books,
      page,
      limit,
      totalCount,
    };
  }

  async getBookById(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async createBook(createBookDto: CreateBookDto) {
    const { image, ...bookData } = createBookDto;

    const s3 = new S3();
    const filePath = join(__dirname, '../../uploads', image.filename);
    const fileContent = await fs.readFile(filePath);

    const uploadResult = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${Date.now()}-${image.originalname}`,
      Body: fileContent,
      ContentType: image.mimetype,
    }).promise();

    await fs.unlink(filePath); // Remove the file after upload

    return await this.prisma.book.create({
      data: {
        ...bookData,
        image: uploadResult.Location,
      },
    });
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return await this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async deleteBook(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return await this.prisma.book.delete({ where: { id } });
  }

  async searchBooks(query: string, page: number = 1, limit: number = 10) {
    const books = await this.prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { synopsis: { contains: query, mode: 'insensitive' } },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalCount = await this.prisma.book.count({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { synopsis: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
    return {
      data: books,
      page,
      limit,
      totalCount,
    };
  }
}
