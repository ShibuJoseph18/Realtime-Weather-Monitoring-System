import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userData.js'; // Import the User model
import RealTimeData from './weatherRealTime.js'; // Import the RealTimeData model

const UserThresholds = sequelize.define('UserThresholds', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id' // Assuming 'id' is the primary key in User model
    }
  },
  temperatureThreshold: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  comparisonType: {
    type: DataTypes.ENUM('greater_than', 'less_than'),
    allowNull: false
  },
  realTimeDataId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Change to false if you want to ensure it's always set
    references: {
      model: RealTimeData,
      key: 'id' // Assuming 'id' is the primary key in RealTimeData model
    }
  }
}, {
  tableName: 'UserThresholds',
  timestamps: true // Track creation and update times
});

// Define foreign key relationships
UserThresholds.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserThresholds.belongsTo(RealTimeData, { foreignKey: 'realTimeDataId', as: 'realTimeData' });

export default UserThresholds;


// // Define foreign key relationships
// UserThresholds.belongsTo(User, { foreignKey: 'user_id' });
// UserThresholds.belongsTo(RealTimeData, { foreignKey: 'real_time_data_id' });

// export default UserThresholds;
