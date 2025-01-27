/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from '../auth/guards/roles.guards';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule to provide PrismaService
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET || 'defaultSecretKey' }),
    AuthModule, // Add AuthModule to imports
    PrismaModule, // Import PrismaModule
    ConfigModule.forRoot(), // Add ConfigModule to load environment variables
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService, RolesGuard], // PrismaService is provided by PrismaModule
})
export class BooksModule {}
