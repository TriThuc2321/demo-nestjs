import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresDbConfiguration } from '@/configs/common.config';
import { AuthModule } from '@/modules/auth/auth.module';
import { CaslModule } from '@/modules/casl/casl.module';
import { UsersModule } from '@/modules/users/users.module';

import { AwsS3Module } from './shared/aws-s3/aws-s3.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresDbConfiguration,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CaslModule,
    AwsS3Module,
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 100,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
