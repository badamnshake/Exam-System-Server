import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chapter } from './chapter.entity';
import { Subject } from './subject.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  information: string;

  @Column({ nullable: true })
  hint: string;

  @Column()
  options: string;

  @ManyToOne(() => Subject, { eager: false })
  subject: Subject;

  @ManyToOne(() => Chapter, { eager: false })
  chapter: Chapter;

  @Column()
  reportedCount: number;

  @CreateDateColumn()
  createdAt: Date;
}

