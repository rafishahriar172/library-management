import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookService } from './book.service';
import { BookDTO } from './dto/book.dto';

@Controller('book')
export class BookController {
  constructor(private bookservice: BookService) {}
  
  @Get()
  async getbooks(){
    return this.bookservice.getBook();
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('createbook')
  @UseInterceptors(FileInterceptor('image'))
  async register(
    @Body() registerDto: BookDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const userData = { ...registerDto, image };
    return this.bookservice.createBook(userData);
  }  
}
