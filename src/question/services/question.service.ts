import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/question/create-question.dto';
import { UpdateQuestionDto } from '../dto/question/update-question.dto';
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

  async remove(id: number) {
    return await this.questionRepository.delete(id);
  }

  findAll() {
    return `This action returns all question`;
  }

  async findOne(id: number) {
    const result =  await this.questionRepository.find({relations: ['subject', 'chapter', 'options', 'correctAnswer']});
    console.log(result);
    return result;
    
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }
}
