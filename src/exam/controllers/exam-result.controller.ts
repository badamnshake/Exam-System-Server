import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';
import { CreateExamDto } from '../dto/create-exam.dto';
import { QuestionService } from 'src/question/services/question.service';
import { Exam } from '../entities/exam.entity';
import { SubjectService } from 'src/question/services/subject.service';
import { ChapterService } from 'src/question/services/chapter.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/_shared/pagination-query.dto';
import { ExamResultService } from '../exam-result.service';
import { CreateExamResultDto } from '../dto/create-exam-result.dto';
import { ExamService } from '../exam.service';
import { UserService } from 'src/user/user.service';
import { ExamResult } from '../entities/exam-result.entity';

@ApiTags('Exam-Result')
@Controller('exam-result')
export class ExamResultController {
  constructor(
    private readonly examResultService: ExamResultService,
    private readonly examService: ExamService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createExamDto: CreateExamResultDto) {
    // get exam from id
    let exam = await this.examService.findOne(createExamDto.examId);
    if (exam === null) {
      throw new NotFoundException('Exam not found');
    }

    let student = await this.userService.findOne(createExamDto.studentId);
    if (student === null) {
      throw new NotFoundException('Student not found');
    }

    let newExamResult = new ExamResult();
    // set attributes
    newExamResult.test = exam;
    newExamResult.student = student;
    newExamResult.subjectId = exam.subjectId;
    newExamResult.chapterId = exam.chapterId;

    newExamResult.correctAnswers = 0;
    newExamResult.wrongAnswers = 0;

    createExamDto.answers.forEach(({ wasCorrect }) => {
      if (wasCorrect) {
        newExamResult.correctAnswers++;
      } else {
        newExamResult.wrongAnswers++;
      }
    });

    newExamResult.marksInPercentage =
      (newExamResult.correctAnswers /
        (newExamResult.correctAnswers + newExamResult.wrongAnswers)) *
      100;

    return await this.examResultService.create(newExamResult);
  }

  /* -------------------------------------------------------------------------- */
  /*                            all the find methods                            */
  /* -------------------------------------------------------------------------- */

  @Get()
  async findAll(@Query() pagination: PaginationQuery) {
    const take = pagination.limit || 10;
    const skip = pagination.page * take || 0;
    return await this.examResultService.findAll(take, skip);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.examResultService.findById(+id);
  }

  @Get('exam/:examId')
  findFromExamId(
    @Query() pagination: PaginationQuery,
    @Param('examId') examId: string,
  ) {
    const take = pagination.limit || 10;
    const skip = pagination.page * take || 0;
    return this.examResultService.findFromExamId(take, skip, +examId);
  }

  @Get('student/:studentId')
  findFromStudentId(
    @Query() pagination: PaginationQuery,
    @Param('studentId') studentId: string,
  ) {
    const take = pagination.limit || 10;
    const skip = pagination.page * take || 0;
    return this.examResultService.findFromStudentId(take, skip, +studentId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.examResultService.remove(+id);
  }
}
