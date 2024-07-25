import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { RegisterDto } from '@/modules/auth/dto';

export default class CreateUserDto extends RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  roleId!: string;
}
