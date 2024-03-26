import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('personal_finance', '', '', {
  host: 'localhost',
  dialect: 'postgres'
});
