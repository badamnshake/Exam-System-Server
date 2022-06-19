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
  Put,
  Response,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateChapterDto } from '../dto/chapter/create-chapter.dto';
import { UpdateChapterDto } from '../dto/chapter/update-chapter.dto';
import { CreateSubjectDto } from '../dto/subject/create-subject.dto';
import { UpdateSubjectDto } from '../dto/subject/update-subject.dto';
import { Chapter } from '../entities/chapter.entity';
import { Subject } from '../entities/subject.entity';
import { ChapterService } from '../services/chapter.service';
import { SubjectService } from '../services/subject.service';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly chapterService: ChapterService,
  ) {}

  //#region  Subject
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

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subjectService.findById(+id);
  }

  @Put(':id')
  async updateSubject(
    @Param('id') id: number,
    @Body() reqBody: UpdateSubjectDto,
  ) {
    const subject = await this.subjectService.findById(id);
    if (subject == null) {
      throw new NotFoundException();
    }
    subject.name = reqBody.name;
    return await this.subjectService.update(id, subject);
  }

  @Delete(':id')
  async deleteSubject(@Param('id') id: string) {
    return await this.subjectService.remove(+id);
  }

  //#endregion

  //#region Chapter

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
  @Get('chapter/:id')
  async findChapterById(@Param('id') id: string) {
    return await this.chapterService.findById(+id);
  }

  @Put('chapter/:id')
  async updateChapter(
    @Param('id') id: number,
    @Body() reqBody: UpdateChapterDto,
  ) {
    const chapter = await this.chapterService.findById(id);
    if (chapter == null) {
      throw new NotFoundException();
    }
    chapter.name = reqBody.name;
    return await this.chapterService.update(id, chapter);
  }

  @Delete('chapter/:id')
  async deleteChapter(@Param('id') id: number) {
    return await this.chapterService.remove(id);
  }




  //#endregion
}
