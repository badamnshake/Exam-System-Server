import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
import { Chapter } from '../entities/chapter.entity';
import { Question } from '../entities/question.entity';

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
    await this.questionRepository.update(id, { correctAnswerId });
  }

  async remove(id: number) {
    return await this.questionRepository.delete(id);
  }

  async findAll() {
    const result = await this.questionRepository.find({
      relations: ['subject', 'chapter', 'options'],
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.questionRepository.findOneBy({ id });
    return result;
  }

  async findFromChapter(take: number, skip: number, chapter: Chapter) {
    take = take || 2;
    skip = skip || 0;

    const result = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.options', 'options')
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
  async findAllPage(query) {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const keyword = query.keyword || '';

    const [result, total] = await this.questionRepository.findAndCount({
      where: { information: Like('%' + keyword + '%') },
      order: { information: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }
}
