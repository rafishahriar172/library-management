/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories() {
    return await this.prisma.category.findMany();
  }

  async getCategoryById(id: string) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return await this.prisma.category.delete({ where: { id } });
  }
}
