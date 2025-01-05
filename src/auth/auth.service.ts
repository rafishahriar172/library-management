import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import * as bcrypt from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {      
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (!validatedUser) {
      console.log('User validation failed.'); // This will log if the user is not found or password doesn't match
    }

    const payload = {
      sub: validatedUser.id,
      email: validatedUser.email,
      role: validatedUser.role,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    //console.log(user.id)
    const { refreshToken: retoken, userId: uid } =
      await this.refreshTokenService.CreateRefreshToken({
        refreshToken,
        userId: validatedUser.id,
      });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: validatedUser,
    };
  }

  async register(userData: any) {
    return this.usersService.createUser(userData);
  }

  async registerbyAdmin(userData: any) {
    return this.usersService.createUserByAdmin(userData);
  }

  async refreshToken(refreshToken: string) {
    try {
      const newAccessToken =
        this.refreshTokenService.VerifyRefreshToken(refreshToken);

      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
