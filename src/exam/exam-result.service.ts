
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamResult } from './entities/exam-result.entity';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamResultService {
  constructor(
    @InjectRepository(Exam)
    private readonly examResultRepository: Repository<ExamResult>,
  ) {}
  async create(exam: Exam) {
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
      .createQueryBuilder('exam')
      .select('exam.id', 'id')
      .addSelect('exam.information', 'information')
      .take(take)
      .skip(skip)
      .orderBy()
      .getMany();
    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: number) {
    const result = await this.examResultRepository.findOne({
      where: { id: id },
      relations: ['questions'],
    });

    return result;
  }

//   async update(id: number, exam: Exam) {
//     const { questions, chapterId, subjectId, expiryTime } = exam;
//     return await this.examResultRepository.update(id, {
//       questions,
//       chapterId,
//       subjectId,
//       expiryTime,
//     });
//   }

  async remove(id: number) {
    return await this.examResultRepository.delete(id);
  }
}
