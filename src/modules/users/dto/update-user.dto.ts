import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from '@/modules/users/dto';

export default class UpdateUserDto extends PartialType(CreateUserDto) {}
