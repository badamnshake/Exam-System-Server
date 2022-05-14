import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateSubjectDto {
  @ApiProperty()
  @IsString()
  @Length(2, 20, {
    message: 'Subject Name must be between 2 and 20 characters',
  })
  name: string;
}
