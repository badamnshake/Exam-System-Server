import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from '../entities/option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async findFromQuestionId(id: number) {
    // return await this.optionRepository.find({relations: ['question']})
    return await this.optionRepository
      .createQueryBuilder('option')
      .select('option.id', 'id')
      .addSelect('option.name', 'name')
      .where('option.questionId = :id', { id })
      .getRawMany();
  }
  async findOne(id: number) {
    return await this.optionRepository.findOneBy({ id });
  }
  async update(id: number, name: string) {
    return await this.optionRepository.update(id, { name });
  }

  async create(option: Option) {
    const newOption = this.optionRepository.create(option);
    const result = await this.optionRepository.save(newOption);
    return result;
  }

  async remove(id: number) {
    return await this.optionRepository.delete(id);
  }
}
