import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { ExamResult } from './exam-result.entity';

@Entity()
export class Answer {
  // fields
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  isAnswered: boolean;

  @Column({ nullable: true })
  reason: string;

  @Column()
  timeTaken: number;

  @Column()
  wasCorrect: boolean;

  // relations
  @ManyToOne(() => Question)
  question: Question;

  @ManyToOne(() => ExamResult)
  examResult: ExamResult;
}
