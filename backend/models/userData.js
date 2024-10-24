import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  temperature_unit: {
    type: DataTypes.ENUM('Celsius', 'Fahrenheit'),
    allowNull: false,
    defaultValue: 'Celsius' // Default to Celsius
  }
}, {
  tableName: 'Users',
  timestamps: true // You can choose to include timestamps if you want to track creation/update times
});

export default User;
