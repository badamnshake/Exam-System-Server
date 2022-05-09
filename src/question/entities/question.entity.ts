import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Chapter } from "./chapter.entity";
import { Option } from "./option.entity";
import { Subject } from "./subject.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  information: string;

  @Column({ nullable: true })
  hint: string;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @Column({type: 'int', nullable: true})
  correctAnswerId: number;

  @ManyToOne(() => Subject)
  subject: Subject;

  @ManyToOne(() => Chapter)
  chapter: Chapter;

  @Column()
  reportedCount: number;

  @CreateDateColumn()
  createdAt: Date;
}

