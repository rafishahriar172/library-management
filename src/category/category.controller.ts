/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    NotFoundException,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { CategoryService } from './category.service';
  import { CreateCategoryDto } from './dto/create-category.dto';
  import { UpdateCategoryDto } from './dto/update-category.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guards';
  import { Roles } from '../auth/decorators/roles.decorator';
  
  @ApiTags('Categories') // Swagger grouping
  @Controller('categories')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Get()
    async getAllCategories() {
      return await this.categoryService.getAllCategories();
    }
  
    @Get(':id')
    async getCategoryById(@Param('id') id: string) {
      const category = await this.categoryService.getCategoryById(id);
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    }
  
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
      return await this.categoryService.createCategory(createCategoryDto);
    }
  
    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async updateCategory(
      @Param('id') id: string,
      @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
      return await this.categoryService.updateCategory(id, updateCategoryDto);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async deleteCategory(@Param('id') id: string) {
      return await this.categoryService.deleteCategory(id);
    }
  }
  