import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from '../entities/chapter.entity';
import { Subject } from '../entities/subject.entity';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
  ) {}

  async create(chapter: Chapter) {
    const newChapter = this.chapterRepository.create(chapter);
    const result = await this.chapterRepository.save(newChapter);
    return result;
  }

  async findById(id: number) {
    return await this.chapterRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.chapterRepository.delete({id});
  }

  async update(id: number, chapter: Chapter) {
    return await this.chapterRepository.save(chapter);
  }
}
