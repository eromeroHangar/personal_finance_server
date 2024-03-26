import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

const Detail = sequelize.define('details', {
  id: {
    type: DataTypes.UUID,
    validate: {
      isUUID: 4
    },
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      isNumeric: { msg: 'Must be a Number' }
    }
  },
  note: DataTypes.STRING(),
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

export default Detail;
