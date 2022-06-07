import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuery } from 'src/_shared/pagination-query.dto';
import { Like, Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
import { Chapter } from '../entities/chapter.entity';
import { Question } from '../entities/question.entity';
import { Subject } from '../entities/subject.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(question: Question) {
    const newQuestion = this.questionRepository.create(question);
    const result = await this.questionRepository.save(newQuestion);
    return result;
  }
  async updateCorrectAnswerId(id: number, correctAnswerId: number) {
    // await this.questionRepository.update(id, { correctAnswerId });
  }

  async remove(id: number) {
    return await this.questionRepository.delete(id);
  }

  async findAll(take: number, skip: number) {
    // const result = await this.questionRepository.find({
    //   relations: ['subject', 'chapter'],
    //   take,
    //   skip,
    //   order:{id: 'DESC'}
    // });

    const result = await this.questionRepository
      .createQueryBuilder('question')
      .select('question')
      .leftJoinAndSelect('question.subject', 'subject')
      .leftJoinAndSelect('question.chapter', 'chapter')
      .take(take)
      .skip(skip)
      .orderBy()
      .getMany();
    const total = await this.questionRepository
      .createQueryBuilder('question')
      .getCount();

    return {
      data: result,
      count: total,
    };
  }
  async findOne(id: number) {
    const result = await this.questionRepository.findOne({
      where: { id: id },
      relations: ['subject', 'chapter'],
    });
    return result;
  }
  async findFromChapter(take: number, skip: number, chapter: Chapter) {
    take = take || 2;
    skip = skip || 0;

    const result = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.chapterId = :id', { id: chapter.id })
      .take(take)
      .skip(skip)
      .orderBy()
      .getMany();
    const total = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.chapterId = :id', { id: chapter.id })
      .getCount();

    return {
      data: result,
      count: total,
    };
  }

  async findFromSubject(take: number, skip: number, subject: Subject) {
    take = take || 2;
    skip = skip || 0;

    const result = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.subjectId = :id', { id: subject.id })
      .take(take)
      .skip(skip)
      .orderBy()
      .getMany();
    const total = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.chapterId = :id', { id: subject.id })
      .getCount();

    return {
      data: result,
      count: total,
    };
  }
  async updateQuestion(id: number, question: UpdateQuestionDto) {
    return await this.questionRepository.update(id, { ...question });
  }
}
