import { type } from 'os';
import { timestamp } from 'rxjs';
import { Role } from 'src/auth/roles/role.enum';
import { ExamResult } from 'src/exam/entities/exam-result.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { ExamResult } from '../exam-result.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  information: string;

  @Column()
  email: string;

  @BeforeInsert()
  emalToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @Column()
  password: string;

  @Column()
  role: Role;

  // Name
  // first name last name required

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  //-----------------------------------------------------

  @Column('timestamp', { nullable: true })
  lastLoggedIn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ExamResult, (testresult) => testresult.student, {
    nullable: true,
  })
  testResults: ExamResult[];
}
