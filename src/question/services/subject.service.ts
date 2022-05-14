import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from '../entities/chapter.entity';
import { Subject } from '../entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(subject: Subject) {
    const newSubject = this.subjectRepository.create(subject);
    const result = await this.subjectRepository.save(newSubject);
    return result;
  }

  async update(id: number, subject: Subject) {
    return await this.subjectRepository.save(subject);
  }

  async findAll() {
    return await this.subjectRepository.find({ relations: ['chapters'] });
  }
  async findById(id: number) {
    return await this.subjectRepository.findOne({
      where: { id },
      relations: ['chapters'],
    });
  }
  async findByNam(name: string) {
    return await this.subjectRepository.findOne({ where: { name } });
  }
  async remove(id: number) {
    return await this.subjectRepository.delete(id);
  }
}
