import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamResult } from './entities/exam-result.entity';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamResultService {
  constructor(
    @InjectRepository(ExamResult)
    private readonly examResultRepository: Repository<ExamResult>,
  ) {}
  async create(exam: ExamResult) {
    const newExam = this.examResultRepository.create(exam);
    const result = await this.examResultRepository.save(newExam);
    return result;
  }

  async findAll(take: number, skip: number) {
    take = take || 2;
    skip = skip || 0;

    const total = await this.examResultRepository
      .createQueryBuilder('exam')
      .getCount();
    if (total == 0) {
      return {
        data: null,
        count: total,
      };
    }

    const result = await this.examResultRepository
      .createQueryBuilder()
      .take(take)
      .skip(skip)
      .orderBy()
      .getMany();
    return {
      data: result,
      count: total,
    };
  }


  async findById(id: number) {
    return await this.examResultRepository.findOneBy({ id });
  }

  async findFromExamId(take: number, skip: number, examId: number) {
    return await this.examResultRepository
      .createQueryBuilder('examResult')
      .where('examResult.examId = :examId', { examId })
      .take(take)
      .skip(skip)
      .getManyAndCount();
  }

  async findFromStudentId(take: number, skip: number, studentId: number) {
    return await this.examResultRepository
      .createQueryBuilder('examResult')
      .where('examResult.studentId = :studentId', { studentId })
      .take(take)
      .skip(skip)
      .getManyAndCount();
  }


  async remove(id: number) {
    return await this.examResultRepository.delete(id);
  }
}
