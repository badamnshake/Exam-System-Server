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
import { Option } from './entities/option.entity';
import { OptionService } from './services/option.service';
import { OptionController } from './controllers/option.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, Subject, Question, Option])],
  controllers: [QuestionController, SubjectController, OptionController],
  providers: [QuestionService, ChapterService, SubjectService, OptionService],
})
export class QuestionModule {}
