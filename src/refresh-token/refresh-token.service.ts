import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from 'src/auth/dto/refresh-token.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async CreateRefreshToken(data: any): Promise<RefreshTokenDto> {
    try {
      // Verify the refresh token
      const { refreshToken, userId } = data;

      await this.prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: userId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });

      return {
        refreshToken: refreshToken,
        userId: userId,
      };
    } catch (error) {
      //console.log(error)
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async VerifyRefreshToken(refreshToken: string) {
    try {
      // Verify the refresh token
      const payload = this.jwtService.verify(refreshToken);

      const existingToken = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });
      if (!existingToken || existingToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      // Generate a new access token
      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email, role: payload.role },
        { expiresIn: '15m' },
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
