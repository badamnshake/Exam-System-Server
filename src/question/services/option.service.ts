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

  async create(option: Option) {
    const newOption = this.optionRepository.create(option);
    const result = await this.optionRepository.save(newOption);
    return result;
  }

  async remove(id: number) {
    return await this.optionRepository.delete(id);
  }
}
