import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { User } from '@/entities';
import type {
  CreateUserDto,
  QueryUserDto,
  UpdateUserDto,
} from '@/modules/users/dto';
import { AwsS3Service } from '@/shared/aws-s3/aws-s3.service';
import type { PageMetaDto } from '@/shared/dto';
import { PaginationDto } from '@/shared/dto';
import {
  UserExistException,
  UserNotFoundException,
} from '@/shared/exception/users.exception';
import { S3_PATH } from '@/type/s3.type';
import { SUCCESS_MESSAGE } from '@/utils/common.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async findAll(_query: QueryUserDto) {
    const users = await this.userRepository.find();

    return new PaginationDto(users, {
      page: 1,
      take: 10,
      totalCount: 20,
    } as PageMetaDto);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'name', 'createdAt', 'role'],
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new UserExistException();
    }

    const newUser = this.userRepository.create(createUserDto);

    await this.userRepository.save(newUser);

    return SUCCESS_MESSAGE({
      message: 'Create user successfully',
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.userRepository.save({ ...user, ...updateUserDto });

    return SUCCESS_MESSAGE<User>({
      message: 'Update user successfully',
    });
  }

  async delete(id: number) {
    await this.userRepository.delete({ id });

    return SUCCESS_MESSAGE<UpdateResult>({
      message: 'Delete user successfully',
    });
  }

  async presignedAvatar(fileName: string) {
    const url = await this.awsS3Service.getS3PresignedUrl({
      privatePath: S3_PATH.USER_AVATAR,
      fileName,
    });

    return SUCCESS_MESSAGE<string>({
      message: 'Get presigned url successfully',
      data: url,
    });
  }
}
