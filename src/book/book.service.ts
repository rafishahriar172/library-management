import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { supabase } from '../supabase/supabase.service';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook(data: any): Promise<BookDTO> {
    const { slNo, image, ...rest } = data;

    const existingSLno = await this.prisma.book.findUnique({ where: { slNo } });

    if (existingSLno) {
      throw new ConflictException('SLNo already exists');
    }

    let imageUrl = null;

    if (image) {
      const { data: uploadData, error } = await supabase.storage
        .from('book-images')
        .upload(`books/${Date.now()}_${image.originalname}`, image.buffer, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw new BadRequestException('Image upload failed');
      }

      imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/book-images/${uploadData.path}`;
    }

    const newBook = await this.prisma.book.create({
        data: {...rest,image: imageUrl,slNo},
    });

    const{...bookDto} = newBook;

    return bookDto as BookDTO;
  }
}
