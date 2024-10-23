    import { DataTypes } from 'sequelize';
    import sequelize from '../config/database.js';

    const WeatherRealTime = sequelize.define('WeatherRealTime', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cityname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    temp: {
        type: DataTypes.FLOAT,
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
    feels_like: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    humidity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wind_speed: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    long: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
    }, {
    tableName: 'WeatherRealTime',
    timestamps: false
    });

    export default WeatherRealTime;
