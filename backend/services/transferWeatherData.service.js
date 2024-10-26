import sequelize from '../config/database.js';
import WeatherRealTime from '../models/weatherRealTime.js';
import WeatherSummary from '../models/weatherSummary.js';

const transferWeatherData = async () => {
    try {
        // Connect to the database
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Fetch all records from WeatherRealTime
        const weatherData = await WeatherRealTime.findAll();



        // Prepare data for WeatherSummary
        const summaryData = weatherData.map(record => ({
            weather_realtime_id: record.id, // Reference to the real-time data
            cityname: record.cityname,
            date: record.date,
            avg_temp: record.avg_temp,
            max_temp: record.max_temp,
            min_temp: record.min_temp,
            dominant_condition: record.dominant_condition,
            humidity: record.humidity,
            wind_speed: record.wind_speed,
        }));

        console.log('Starting weather data transfer.');
        // Insert into WeatherSummary
        await WeatherSummary.bulkCreate(summaryData);
        console.log('Weather data transferred to summary successfully.');

    } catch (error) {
        console.error('Error transferring weather data:', error);
    } 
};

// Export the function for scheduling
export default transferWeatherData;
