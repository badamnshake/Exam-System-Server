import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UpdateChapterDto {
  @ApiProperty()
  @IsString()
  @Length(2, 20, {
    message: 'Chapter Name must be between 2 and 20 characters',
  })
  name: string;
}
