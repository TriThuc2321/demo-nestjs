import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CheckPermissions } from '@/modules/auth/decorators/check-permissions.decorator';
import {
  CreateUserDto,
  QueryUserDto,
  UpdateUserDto,
} from '@/modules/users/dto';
import { UsersService } from '@/modules/users/users.service';
import { ObjectName, PermissionAction } from '@/type/auth.type';

@ApiTags('users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @CheckPermissions([PermissionAction.View, ObjectName.user])
  findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @CheckPermissions([PermissionAction.View, ObjectName.user])
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @CheckPermissions([PermissionAction.Create, ObjectName.user])
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @CheckPermissions([PermissionAction.Update, ObjectName.user])
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @CheckPermissions([PermissionAction.Delete, ObjectName.user])
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get('presigned-avatar/:filename')
  @CheckPermissions([PermissionAction.Create, ObjectName.s3])
  presignedAvatar(@Param('filename') filename: string) {
    return this.usersService.presignedAvatar(filename);
  }
}
