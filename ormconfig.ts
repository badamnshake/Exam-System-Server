import { Chapter } from 'src/question/entities/chapter.entity';
import { Question } from 'src/question/entities/question.entity';
import { Subject } from 'src/question/entities/subject.entity';
import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { databaseUrl } from 'src/_config/config';
import { ExamResult } from 'src/exam/entities/exam-result.entity';
import { Exam } from 'src/exam/entities/exam.entity';
import { Answer } from 'src/exam/entities/answer.entity';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: databaseUrl,
  synchronize: true,
  logging: true,
  entities: [User, Chapter, Subject, Question, ExamResult, Exam, Answer],
  subscribers: [],
  migrations: [],
};

export default ormConfig;
