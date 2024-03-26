import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    validate: {
      isUUID: 4
    },
    primaryKey: true
  },
  name: DataTypes.STRING(60),
  email: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      isEmail: { msg: 'please add a valid Email' }
    },
    unique: {
      args: true,
      msg: 'User already register'
    }
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Password can not be emplty' }
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  token: DataTypes.STRING,
  tokenExpired: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

// Compare Password
User.prototype.PasswordValidate = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
