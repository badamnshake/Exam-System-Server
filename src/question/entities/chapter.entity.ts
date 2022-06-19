import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Subject } from './subject.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Subject, (subject) => subject.chapters, {onDelete: 'CASCADE'})
  subject: Subject;

  @OneToMany(() => Question, (question) => question.chapter, {
    eager: false,
  })
  questions: Question[];
}
