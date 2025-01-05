import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule,
    JwtModule.registerAsync({
        imports: [ConfigModule], // Import ConfigModule to use environment variables
        inject: [ConfigService], // Inject ConfigService to read environment variables
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '3600s' }, // Set your token expiration
        }),
      }),
      ConfigModule,
  ],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
