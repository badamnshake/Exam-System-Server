import { User } from "src/user/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const ormConfig: PostgresConnectionOptions  = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "examSystem",
  synchronize: true,
  logging: true,
  entities: [
      User
  ],
  subscribers: [],
  migrations: [],
}

export default ormConfig;