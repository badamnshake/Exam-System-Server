import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { Exam } from './exam.entity';

@Entity()
export class ExamResult {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Answer, (answer) => answer.examResult)
  answers: Answer[];

  @ManyToOne(() => Exam, (test) => test.testResults)
  test: Exam;

  @ManyToOne(() => User, (user) => user.testResults)
  student: User;

  @Column({ nullable: true })
  subjectId: number;

  @Column({ nullable: true })
  chapterId: number;

  @Column()
  correctAnswers: number;

  @Column()
  wrongAnswers: number;

  @Column()
  marksInPercentage: number;
}
