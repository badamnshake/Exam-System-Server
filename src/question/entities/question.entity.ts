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

  @ManyToOne(() => Subject, {onDelete: 'CASCADE'})
  subject: Subject;

  @ManyToOne(() => Chapter)
  chapter: Chapter;

  @Column()
  reportedCount: number;

  @CreateDateColumn()
  createdAt: Date;
}

