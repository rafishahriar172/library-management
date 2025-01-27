/* eslint-disable prettier/prettier */
import { Module,Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './stratagies/local.stratagy';
import { JwtStrategy } from './stratagies/jwt.stratagy';
import { GoogleStrategy } from './stratagies/google.strategy';
import { FacebookStrategy } from './stratagies/facebook.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // Load environment variables
    PassportModule,
    PrismaModule // Import PrismaModule
  ],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    JwtService, // Ensure JwtService is listed as a provider
    ConfigService, // Ensure ConfigService is listed as a provider
  ],
  controllers: [AuthController],
})
export class AuthModule {}
