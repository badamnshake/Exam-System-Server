import { ApiBody, ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  @MinLength(5, {
    message: 'Question must be more than 5 characters',
  })
  information: string;

  @ApiProperty()
  @IsString()
  @MinLength(5, {
    message: 'Reason must be 5 characters',
  })
  hint: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'options must not be empty' })
  options: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'subject id must not be empty' })
  subjectId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'chapter id must not be empty' })
  chapterId: number;
}

export class qOptionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isCorrect: boolean;
}
