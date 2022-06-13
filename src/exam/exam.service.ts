import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {}
  async create(exam: Exam) {
    const newExam = this.examRepository.create(exam);
    const result = await this.examRepository.save(newExam);
    return result;
  }

  async findAll(take: number, skip: number) {
    take = take || 2;
    skip = skip || 0;

    const total = await this.examRepository
      .createQueryBuilder('exam')
      .getCount();
    if (total == 0) {
      return {
        data: null,
        count: total,
      };
    }

    const result = await this.examRepository
      .createQueryBuilder('exam')
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
    const result = await this.examRepository.findOne({
      where: { id: id },
      relations: ['questions'],
    });

    return result;
  }

  async update(id: number, exam: Exam) {
    const { questions, chapterId, subjectId, expiryTime } = exam;
    return await this.examRepository.update(id, {
      questions,
      chapterId,
      subjectId,
      expiryTime,
    });
  }

  async remove(id: number) {
    return await this.examRepository.delete(id);
  }
}
