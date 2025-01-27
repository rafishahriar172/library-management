/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  await app.listen(5000);
}
bootstrap();
