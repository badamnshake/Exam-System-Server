
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
} from '@nestjs/common';
import { ExamService } from '../exam.service';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';
import { QuestionService } from 'src/question/services/question.service';
import { Exam } from '../entities/exam.entity';
import { SubjectService } from 'src/question/services/subject.service';
import { ChapterService } from 'src/question/services/chapter.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Exam-Result')
@Controller('exam')
export class ExamResultController {
  constructor(
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
    private readonly subjectService: SubjectService,
    private readonly chapterService: ChapterService,
  ) {}

  @Post()
  async create(@Body() createExamDto: CreateExamDto) {
    // get all questions from id
    let questions = await Promise.all(
      createExamDto.questionIds.map(async (questionId) => {
        let result = await this.questionService.findOne(questionId);
        if (result === null) {
          throw new NotFoundException('Question not found');
        }
        return result;
      }),
    );
    // check subject
    let subject = await this.subjectService.findById(createExamDto.subjectId);
    if (!subject) throw new NotFoundException('Subject not found');

    // check chapter
    let chapter = await this.chapterService.findById(createExamDto.chapterId);
    if (!chapter) throw new NotFoundException('Chapter not found');
    // create exam
    let exam = new Exam();

    exam.information = createExamDto.information;
    exam.expiryTime = createExamDto.expiryTime;
    exam.questions = questions;
    exam.chapterId = chapter.id;
    exam.subjectId = subject.id;
    // exam given times is 0 when its initialized

    return this.examService.create(exam);
  }

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    const exam = await this.examService.findOne(+id);

    // if update the question
    if (updateExamDto.questionIds) {
      let questions = await Promise.all(
        updateExamDto.questionIds.map(async (questionId) => {
          let result = await this.questionService.findOne(questionId);
          if (result === null) {
            throw new NotFoundException('Question not found');
          }
          return result;
        }),
      );
      exam.questions = questions;
    }
    if (updateExamDto.chapterId) exam.chapterId = updateExamDto.chapterId;
    if (updateExamDto.subjectId) exam.subjectId = updateExamDto.subjectId;
    if (updateExamDto.expiryTime) exam.expiryTime = updateExamDto.expiryTime;

    return this.examService.update(+id, exam);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.examService.remove(+id);
  }
}
