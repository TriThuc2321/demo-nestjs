import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_SECRET,
} from '@/constants/env.constant';
import { Permission, PermissionRole, User } from '@/entities';
import { PermissionGuard } from '@/modules/auth/guards/permission.guard';
import { CaslAbilityFactory } from '@/modules/casl/casl-ability.factory';
import UsersController from '@/modules/users/users.controller';
import { UsersService } from '@/modules/users/users.service';
import { AwsS3Service } from '@/shared/aws-s3/aws-s3.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LinkedInStrategy } from './strategies/linkedin.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME },
    }),
    TypeOrmModule.forFeature([User, Permission, PermissionRole]),
  ],
  controllers: [AuthController, UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    JwtStrategy,
    GoogleStrategy,
    LinkedInStrategy,
    AuthService,
    UsersService,
    CaslAbilityFactory,
    AwsS3Service,
  ],
  exports: [AuthService, UsersService],
})
export class AuthModule {}
