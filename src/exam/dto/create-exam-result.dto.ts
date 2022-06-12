import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateExamResultDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'exam id is required' })
  @IsNumber()
  examId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'student id is required' })
  @IsNumber()
  studentId: number;

  @ApiProperty({type: () => [answerDto]})
  @IsNotEmpty({ message: 'questions must not be empty' })
  answers: answerDto[];
}

export class answerDto {
  @ApiProperty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsBoolean()
  wasCorrect: boolean;

  @ApiProperty()
  @IsBoolean()
  wasAnswered: boolean;

  @ApiProperty()
  @IsNumber()
  timeTaken: number;
}
