import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isAnswered: boolean;

  @Column({ nullable: true })
  reason: string;

  @Column()
  timeTaken: number;

  @Column()
  optionId: number;

  @ManyToOne(() => Question)
  question: Question;
}
