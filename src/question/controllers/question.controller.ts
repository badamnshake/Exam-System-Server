import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { ChapterService } from '../services/chapter.service';
import { SubjectService } from '../services/subject.service';
import { OptionService } from '../services/option.service';
import { STATUS_CODES } from 'http';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('questions')
@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly subjectService: SubjectService,
    private readonly chapterService: ChapterService,
    private readonly optionService: OptionService,
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
    question.reportedCount = 0;

    let newq = await this.questionService.create(question);

    createQuestionDto.optionsNotIncludingAnswer.forEach((option) => {
      let newOption = new Option();
      newOption.name = option;
      newOption.question = newq;
      this.optionService.create(newOption);
    });

    let newOption = new Option();
    newOption.name = createQuestionDto.optionWhichIsAnswer;
    newOption.question = newq;
    let answer = await this.optionService.create(newOption);

    newq.correctAnswerId = answer.id;
    await this.questionService.updateCorrectAnswerId(newq.id, answer.id);
    return STATUS_CODES.OK;
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    // return this.questionService.updateCorrectAnswerId(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
  
}
