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
import { UpdateOptionDto } from '../dto/option/updateOption.dto';

@ApiTags('options')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService, private readonly questionService: QuestionService) {}

  @Get('getFromQuestionId/:id')
  async findFromQId(@Param('id') id: string) {
    
    return await this.optionService.findFromQuestionId(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.optionService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateOptionDto) {
    return await  this.optionService.update(+id, body.name);
  }

  // delete must be used carefully as it can also delete correct answer
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.optionService.remove(+id);
  }
}
