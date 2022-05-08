import { Chapter } from 'src/question/entities/chapter.entity';
import { Question } from 'src/question/entities/question.entity';
import { Option } from 'src/question/entities/option.entity';
import { Subject } from 'src/question/entities/subject.entity';
import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { databaseUrl } from 'src/_config/config';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: databaseUrl,
  synchronize: true,
  logging: true,
  entities: [User, Chapter, Subject, Question, Option],
  subscribers: [],
  migrations: [],
};

export default ormConfig;
