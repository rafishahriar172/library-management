/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserprofileController } from './userprofile.controller';
import { UserprofileService } from './userprofile.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule to provide PrismaService
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET || 'defaultSecretKey' }),
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot(),  
  ],
  controllers: [UserprofileController],
  providers: [UserprofileService],
})
export class UserprofileModule {}
