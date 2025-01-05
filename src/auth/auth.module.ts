import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, // Import UsersModule to access UsersService
    RefreshTokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule to use environment variables
      inject: [ConfigService], // Inject ConfigService to read environment variables
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' }, // Set your token expiration
      }),
    }),
    ConfigModule, // Ensure ConfigModule is imported to use environment variables
  ],
  providers: [AuthService, JwtStrategy], // Provide AuthService and JwtStrategy
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService for use in other modules
})
export class AuthModule {}
