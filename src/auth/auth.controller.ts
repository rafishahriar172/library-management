import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('image'))
  async register(@Body() registerDto: RegisterDto, @UploadedFile() image: Express.Multer.File) {
    const userData = { ...registerDto, image };
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('registerAdmin')
  @UseInterceptors(FileInterceptor('image'))
  async registerbyAdmin(@Body() registerDto: RegisterDto, @UploadedFile() image: Express.Multer.File) {
    const userData = { ...registerDto, image };
    return this.authService.registerbyAdmin(userData);
  }

  // @Post('refresh-token')
  // async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.refreshToken(refreshTokenDto.refreshToken);
  // }
}
