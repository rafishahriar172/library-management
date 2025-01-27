/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTestEmail(to: string, subject: string, text: string) {
    return this.mailerService.sendMail({
      to: to,
      subject: subject,
      text: text,
      from: `"Library Management" <rafijhol420@gmail.com>`, // Optional: Update the sender address
      replyTo: 'rafijhol420@gmail.com', // Prevent replies
    });
  }
}
