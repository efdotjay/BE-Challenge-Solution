
import { Sequelize, Dialect } from 'sequelize';

const dbDialect = process.env.DB_DIALECT as Dialect;
const dbHost = process.env.DB_HOST as string;
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dbDialect,
  host: dbHost
});

export default sequelize;
