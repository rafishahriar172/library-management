/* eslint-disable prettier/prettier */
// mail.controller.ts
import {
    Body,
    Controller,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { MailService } from './mail.service';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guards';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { SendEmailDto } from './dto/send-mail.dto';
  
  @Controller('mail')
  export class MailController {
    constructor(private readonly mailService: MailService) {}
  
    @Post('send-email')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async sendTestEmail(@Body() sendEmailDto: SendEmailDto) {
      const { to, subject, text } = sendEmailDto;
      return this.mailService.sendTestEmail(to, subject, text);
    }
  }
  
