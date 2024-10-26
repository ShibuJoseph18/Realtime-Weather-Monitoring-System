import axios from 'axios';
import WeatherRealTime from '../models/weatherRealTime.js';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY; // Replace with your actual API key

export const fetchWeatherData = async (lat, lon, cityId) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

    const weatherData = response.data;
    const temp = weatherData.main.temp;
    const avg_temp = weatherData.main.temp;
    const feels_like = weatherData.main.feels_like;
    const min_temp = weatherData.main.temp_min;
    const max_temp = weatherData.main.temp_max;

    // Update the corresponding row in the WeatherRealTime table
    await WeatherRealTime.update(
      {
        date: new Date(),
        temp,
        avg_temp,
        max_temp,
        min_temp,
        dominant_condition: weatherData.weather[0].main,
        feels_like,
        humidity: weatherData.main.humidity,
        wind_speed: weatherData.wind.speed,
      },
      {
        where: { id: cityId }
      }
    );

    console.log(`Weather data updated for city ID: ${cityId}`);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};
