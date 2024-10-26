import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import WeatherRealTime from './weatherRealTime.js';

const WeatherSummary = sequelize.define('WeatherSummary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  weather_realtime_id: {
    type: DataTypes.INTEGER,
    references: {
      model: WeatherRealTime,
      key: 'id'
    },
    allowNull: false
  },
  cityname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  avg_temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  max_temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  min_temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dominant_condition: {
    type: DataTypes.STRING,
    allowNull: false
  },
  humidity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  wind_speed: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'WeatherSummary',
  timestamps: false
});

export default WeatherSummary;
