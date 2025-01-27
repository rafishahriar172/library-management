/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { UserprofileService } from './userprofile/userprofile.service';
import { UserprofileModule } from './userprofile/userprofile.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { LoanController } from './loan/loan.controller';
import { LoanModule } from './loan/loan.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');        
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    BooksModule,
    UserprofileModule,
    CategoryModule,
    LoanModule,
    MailModule,
  ],
  controllers: [BooksController, CategoryController, LoanController],
  providers: [AppService, PrismaService, BooksService, UserprofileService],
})
export class AppModule {}
