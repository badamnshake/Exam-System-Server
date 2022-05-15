import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { type } from 'os';

export class CreateExamDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'questions must not be empty' })
  @IsString()
  @MinLength(2, { message: 'questions must be at least 2 characters' })
  information: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'questions must not be empty' })
  questionIds: [number];

  @ApiProperty()
  @IsNotEmpty({ message: 'expiry time is needed' })
  @IsDateString({ message: 'expiry time must be an iso string' })
  expiryTime: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'subject id is needded' })
  @IsNumber()
  subjectId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'subject id is needded' })
  @IsNumber()
  chapterId: number;
}
