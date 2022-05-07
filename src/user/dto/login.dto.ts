import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(2, 20, { message: 'Password must be between 2 and 20 characters' })
  password: string;
}
