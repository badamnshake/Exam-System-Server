import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExamDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'questions must not be empty' })
  questions: [number];

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
