import { Question } from 'src/question/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExamResult } from './exam-result.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  information: string;

  @ManyToMany(() => Question)
  @JoinTable()
  questions: Question[];

  @Index()
  @Column({ type: 'timestamptz', nullable: true })
  expiryTime: Date;

  @Index()
  @Column({ nullable: true })
  subjectId: number;

  @Index()
  @Column({ nullable: true })
  chapterId: number;


  @OneToMany(() => ExamResult, (testResult) => testResult.test)
  testResults: ExamResult[];

  @CreateDateColumn()
  createdAt: Date;
}
