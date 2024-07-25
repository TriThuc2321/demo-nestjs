import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}
