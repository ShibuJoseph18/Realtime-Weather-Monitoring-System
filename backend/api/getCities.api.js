import WeatherRealTime from '../models/weatherRealTime.js'; // Import the model

// Function to get all cities from the database
export const getAllCities = async (req, res) => {
  try {
    const cities = await WeatherRealTime.findAll({
      attributes: ['cityname'],
      group: ['cityname']
    });

    const cityNames = cities.map(city => city.cityname);
    res.status(200).json(cityNames);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities', error });
  }
};

// Function to get weather data for a specific city
export const getCityWeather = async (req, res) => {
  const { cityname } = req.params;

  try {
    const weatherData = await WeatherRealTime.findOne({
      where: { cityname }
    });

    if (!weatherData) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data', error });
  }
};
