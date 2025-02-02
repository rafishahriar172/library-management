/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Res,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { Request, Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

ApiTags('auth');
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.registerUser(
      registerDto.email,
      registerDto.name,
      registerDto.password,
    );
  }

  @Post('registerAdmin')
  async registerAdmin(@Body() registerDto: RegisterDto) {
    return await this.authService.registerUserAdmin(
      registerDto.email,
      registerDto.name,
      registerDto.password,
    );
  }

  @Post('login')
  @ApiBody({ type: LoginDto }) // Specifies the DTO for the request body
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    return this.authService.login(req.user, res);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res() res: Response) {
    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
    return res.json({ message: 'Logged out successfully' });
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: Request) {
    // This method is a placeholder to initiate Google login.
  }

  // @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  // async googleRedirect(@Req() req: Request, @Res() res: Response) {
  //   const user = req.user;
  //   const result = await this.authService.login(user,res);
  //   res.redirect(`http://localhost:5000?token=${result.access_token}`);
  // }

  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookAuth(@Req() req: Request) {
    // This method is a placeholder to initiate Facebook login.
  }

  // @Get('facebook/redirect')
  // @UseGuards(FacebookAuthGuard)
  // async facebookRedirect(@Req() req: Request, @Res() res: Response) {
  //   const user = req.user;
  //   const result = await this.authService.login(user,res);
  //   res.redirect(`http://localhost:5000?token=${result.access_token}`);
  // }

  @Post('deleteUser')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
      },
      required: ['email'],
    },
  })
  async deleteUser(@Body('email') email: string) {
    return await this.authService.deleteUser(email);
  }
}
