import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { configSwagger, configureCors } from '@/configs/common.config';
import { APP_PORT, SESSION_SECRET } from '@/constants/env.constant';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(configureCors());

  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  app.use(cookieParser());

  app.use(
    session({
      secret: SESSION_SECRET ?? '',
      resave: false,
      saveUninitialized: true,
    }),
  );

  configSwagger(app);

  await app.listen(APP_PORT ?? 3000, () => {
    console.info(`App listening in ${APP_PORT ?? 3000}`);
  });
}

void bootstrap();
