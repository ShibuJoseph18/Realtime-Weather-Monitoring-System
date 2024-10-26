import { useEffect, useState } from 'react';
import dotenv from 'react-dotenv';




const convertTemperature = (temp, unit) => {

  // Assuming `temp` is in Kelvin by default
  const tempInCelsius = temp - 273.15;
  return unit === 'F' ? (tempInCelsius * 9/5) + 32 : tempInCelsius;
};

export const WeeklyForecast = ({ lat, lon, unit }) => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setForecastData(data.list);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const dailyForecasts = [];
  const seenDays = new Set();

  forecastData.forEach(entry => {
    const date = new Date(entry.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
    if (date !== today && !seenDays.has(date)) {
      dailyForecasts.push({
        day: date,
        temperature: entry.main.temp,
        condition: entry.weather[0].description,
      });
      seenDays.add(date);
    }
  });

  const formattedForecasts = dailyForecasts.slice(0, 5);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Weekly Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {formattedForecasts.map((day) => (
          <div key={day.day} className="text-center p-2 bg-secondary rounded-lg">
            <p className="font-medium text-sm">{day.day}</p>
            <p className="text-lg font-bold my-1">{Math.round(convertTemperature(day.temperature, unit))}°{unit}</p>
            <p className="text-xs text-muted-foreground">{day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


