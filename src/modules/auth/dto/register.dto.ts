import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { LoginDto } from '@/modules/auth/dto/index';

export default class RegisterDto extends LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;
}
