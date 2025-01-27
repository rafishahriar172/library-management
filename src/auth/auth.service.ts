/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service'; // Import the EmailService

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Add ConfigService
    private readonly emailService: MailService, // Add EmailService
  ) {}

  async validateLocalUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');
    return user;
  }

  async registerUser(email: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.user.create({
        data: { email, name, password: hashedPassword, role: 'MEMBER' },
      });
      const emailsend = await this.emailService.sendTestEmail(email, 'Welcome to Library Management', 'You have been registered');
      if(!emailsend){
        console.log('Email was not send',emailsend);
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('User registration failed');
    }
  }

  async registerUserAdmin(email: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.user.create({
        data: { email, name, password: hashedPassword, role: 'ADMIN' },
      });

      //send email
      const emailsend = await this.emailService.sendTestEmail(email, 'Welcome to Library Management', 'You have been registered as an admin');
      if(!emailsend){
        console.log('Email was not send',emailsend);
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('User registration failed');
    }
  }

  async login(user: any) {
    const payload = { email: user.email, role: user.role, sub: user.id };
    const secret = this.configService.get<string>('JWT_SECRET');
    return { access_token: this.jwtService.sign(payload, { secret }) }; // Use the secret explicitly
  }

  async validateUser(providerUserId: string, provider: string) {
    const user = await this.prisma.provider.findFirst({
      where: {
        providerUserId,
        provider,
      },
      include: {
        User: true,
      },
    });

    if (!user) {
      return null;
    }
    return user.User; // Return the associated User
  }

  async createUser(
    email: string,
    name: string,
    providerUserId: string,
    provider: string,
  ) {
    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash('defaultPassword', 10), // Add a default password or handle it appropriately
        role: 'MEMBER', // Default role, can be changed later
        Provider: {
          create: {
            provider,
            providerUserId,
          },
        },
      },
    });

    return newUser;
  }

  async deleteUser(email: string) {
    try {
      await this.prisma.user.delete({
        where: {
          email: email, // Email is passed as a string here
        },
      });

      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Unauthorized');
    }
  }
}
