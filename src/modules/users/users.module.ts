import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/entities';
import { CaslModule } from '@/modules/casl/casl.module';
import UsersController from '@/modules/users/users.controller';
import { UsersService } from '@/modules/users/users.service';
import { AwsS3Service } from '@/shared/aws-s3/aws-s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CaslModule],
  controllers: [UsersController],
  providers: [UsersService, AwsS3Service],
})
export class UsersModule {}
