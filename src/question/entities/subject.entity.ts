import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Chapter } from './chapter.entity';
import { Question } from './question.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Chapter, (chapter) => chapter.subject, {
  })
  chapters: Chapter[];

  @OneToMany(() => Question, (question) => question.subject, {
  })
  questions: Question[];
}
