import { join } from 'node:path';

import type { INestApplication } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

import {
  CORS_CONFIGURE,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_PWD,
  DATABASE_SYNC,
  DATABASE_UID,
} from '@/constants/env.constant';

export const configureCors = () => {
  const origins = CORS_CONFIGURE?.split(',');

  return {
    allowedHeaders: '*',
    origin: origins ?? ['http://localhost:3000'],
  };
};

export const configSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('PathCan APIs')
    .setDescription('PathCan APIs document')
    .setVersion('1.0.0')
    // .addCookieAuth(ACCESS_TOKEN_COOKIE_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

@Injectable()
export class PostgresDbConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: DATABASE_UID,
      password: DATABASE_PWD,
      database: DATABASE_NAME,
      entities: [join(__dirname, '/../**/*.entity.{js,ts}')],
      synchronize: DATABASE_SYNC,
      logging: true,
      ssl: true,
    };
  }
}
