import { forwardRef, Module } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { SubjectController } from './controllers/subject.controller';
import { SubjectService } from './services/subject.service';
import { ChapterService } from './services/chapter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { Subject } from './entities/subject.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, Subject, Question ])],
  controllers: [QuestionController, SubjectController],
  providers: [QuestionService, ChapterService, SubjectService],
})
export class QuestionModule {}
