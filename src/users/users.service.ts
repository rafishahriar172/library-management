import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { supabase } from '../supabase/supabase.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: any): Promise<UserDto> {
    const { email, password, image, ...rest } = data;
    const existingUser = await this.prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let imageUrl = null;

    if (image) {
      const { data: uploadData, error } = await supabase
        .storage
        .from('user-images')
        .upload(`profiles/${Date.now()}_${image.originalname}`, image.buffer, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw new BadRequestException('Image upload failed');
      }

      imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/user-images/${uploadData.path}`;
    }

    const newUser = await this.prisma.user.create({
      data: { ...rest, email, password: hashedPassword, image: imageUrl, role: 'MEMBER' },
    });

    const { password: _, ...userDto } = newUser;
    return userDto as UserDto;
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...userDto } = user;
    return userDto as UserDto;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
