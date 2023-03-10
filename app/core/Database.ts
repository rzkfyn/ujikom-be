import { Sequelize, Dialect } from 'sequelize';
import 'dotenv/config';

const {
  DB_DIALECT,
  DB_PORT,
  DB_HOST,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD
} = process.env;

const Database = new Sequelize({
  dialect: DB_DIALECT as Dialect ?? 'mysql',
  port: parseInt(DB_PORT as string) ?? 3306,
  host: DB_HOST ?? 'localhost',
  database: DB_DATABASE ?? 'tbdl',
  username: DB_USERNAME ?? 'root',
  password: DB_PASSWORD ?? '',
  logging: false
});

export default Database;
