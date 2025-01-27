/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,
    //UseInterceptors,
    //UploadedFile,
  } from '@nestjs/common';
  //import { FileInterceptor } from '@nestjs/platform-express';
  import { BooksService } from './books.service';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guards';
  import { Roles } from '../auth/decorators/roles.decorator';
  // import { diskStorage } from 'multer';
  // import { extname } from 'path';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Get()
    async getAllBooks() {
      return await this.booksService.getAllBooks();
    }
  
    @Get(':id')
    async getBookById(@Param('id') id: string) {
      return await this.booksService.getBookById(id);
    }

    @Get('search')
    async searchBooks(
      @Query('query') query: string,
      @Query('page') page: number,
      @Query('limit') limit: number,
    ) {
      return await this.booksService.searchBooks(query, page, limit);
    }
  
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    // @UseInterceptors(FileInterceptor('image', {
    //   storage: diskStorage({
    //     destination: './uploads',
    //     filename: (req, file, cb) => {
    //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //       cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    //     },
    //   }),
    // }))
    async createBook(@Body() createBookDto: CreateBookDto){ //, @UploadedFile() image: Express.Multer.File) {
      return await this.booksService.createBook({ ...createBookDto });
    }
  
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
      return await this.booksService.updateBook(id, updateBookDto);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async deleteBook(@Param('id') id: string) {
      return await this.booksService.deleteBook(id);
    }
  }
