/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Library Management API')
    .setDescription('API documentation for the Library Management app')
    .setVersion('1.0')
    .addBearerAuth() // For JWT authentication
    .addOAuth2({
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl: 'https://accounts.google.com/o/oauth2/auth', // Example for Google OAuth
          scopes: {
            profile: 'Access your profile',
            email: 'Access your email',
          },
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI at http://localhost:3000/api

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: "https://library-management-frontend-delta.vercel.app", // ✅ Use exact frontend URL
    credentials: true, // ✅ Required for cookies
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept, Authorization",
  });

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
