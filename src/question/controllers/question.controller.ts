import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
import { Question } from '../entities/question.entity';
import { ChapterService } from '../services/chapter.service';
import { SubjectService } from '../services/subject.service';
import { STATUS_CODES } from 'http';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';

@ApiTags('questions')
@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly subjectService: SubjectService,
    private readonly chapterService: ChapterService,
  ) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    let question = new Question();
    let subject = await this.subjectService.findById(
      createQuestionDto.subjectId,
    );
    let chapter = await this.chapterService.findById(
      createQuestionDto.subjectId,
    );
    if (subject == null || chapter == null) {
      return 'Subject or Chapter not found';
    }
    question.chapter = chapter;
    question.subject = subject;
    question.hint = createQuestionDto.hint;
    question.information = createQuestionDto.information;

    createQuestionDto.options.forEach((element) => {
      question.options.push(element);
    });

    question.reportedCount = 0;

    let newq = await this.questionService.create(question);

    return newq;
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionService.findOne(+id);
  }

  @Get('chapter/:id')
  async findFromChapterId(@Query() { take, skip }, @Param('id') id: string) {
    const chapter = await this.chapterService.findById(+id);
    if (!chapter) throw new NotFoundException('Chapter not found');
    return await this.questionService.findFromChapter(take, skip, chapter);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const question = await this.questionService.findOne(+id);
    if (!question) throw new NotFoundException('Question not found');
    return await this.questionService.updateQuestion(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
