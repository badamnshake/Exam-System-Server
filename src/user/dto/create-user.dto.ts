import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  information: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(2, 20, { message: 'Password must be between 2 and 20 characters' })
  password: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  // Name
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 20, { message: 'First name must be between 2 and 20 characters' })
  firstName: string;

  @ApiProperty()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 20, { message: 'First name must be between 2 and 20 characters' })
  lastName: string;
}
