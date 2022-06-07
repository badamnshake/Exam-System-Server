import { forwardRef, Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './controllers/exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { QuestionModule } from 'src/question/question.module';
import { QuestionService } from 'src/question/services/question.service';
import { ExamResultService } from './exam-result.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([Exam]),
    QuestionModule
  ],
  controllers: [ExamController],
  providers: [ExamService, ExamResultService]
})
export class ExamModule {}
