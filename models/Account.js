import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';
import Detail from './Detail.js';

const Account = sequelize.define('accounts', {
  id: {
    type: DataTypes.UUID,
    validate: {
      isUUID: 4
    },
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  initialMoney: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      isNumeric: { msg: 'Must be a Number' }
    }
  },
  currency: {
    type: DataTypes.STRING
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

Account.hasMany(Detail);
Detail.belongsTo(Account);

export default Account;
