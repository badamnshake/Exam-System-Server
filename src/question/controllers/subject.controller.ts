import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateChapterDto } from '../dto/chapter/create-chapter.dto';
import { CreateSubjectDto } from '../dto/subject/create-subject.dto';
import { Chapter } from '../entities/chapter.entity';
import { Subject } from '../entities/subject.entity';
import { ChapterService } from '../services/chapter.service';
import { SubjectService } from '../services/subject.service';

@Controller('subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly chapterService: ChapterService,
  ) {}

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findById(+id);
  }

  @Post()
  async createSubject(@Body() reqBody: CreateSubjectDto) {
    let subject = await this.subjectService.findByNam(reqBody.name);
    if (subject != null) {
      throw new BadRequestException('Subject already exists');
    }
    subject = new Subject();
    subject.name = reqBody.name;
    subject = await this.subjectService.create(subject);
    reqBody.chapters.forEach(async (chapter) => {
      const chap = new Chapter();
      chap.subject = subject;
      chap.name = chapter;
      await this.chapterService.create(chap);
    });
    return true;
  }

  @Delete(':id')
  async deleteSubject(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }

  // chapter stuff
  @Post('chapter')
  async createChapter(@Body() reqBody: CreateChapterDto) {
    const subject = await this.subjectService.findById(reqBody.subjectId);
    if (subject == null) {
      throw new NotFoundException();
    }
    const chapter = new Chapter();
    chapter.subject = subject;
    chapter.name = reqBody.name;
    return await this.chapterService.create(chapter);
  }
  @Delete('chapter/:id')
  deleteChapter(@Param('id') id: number) {
    return this.chapterService.remove(id);
  }
}
