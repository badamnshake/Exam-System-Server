import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './controllers/exam.controller';

@Module({
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule {}
