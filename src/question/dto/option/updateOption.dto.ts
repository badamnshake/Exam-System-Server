import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateOptionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'option must not be empty' })
  name: string;
}
