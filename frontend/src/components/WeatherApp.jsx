import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeatherDetails } from './WeatherDetails';
import { WeeklyForecast } from './WeeklyForecast';
// import { ThresholdSetting } from './ThresholdSetting';

const convertTemperature = (temp, unit) => {
  const tempInCelsius = temp - 273.15;
  return unit === 'F' ? (tempInCelsius * 9/5) + 32 : tempInCelsius;
};

export const WeatherApp = ({ cityData, unit, onTemperatureUnitChange }) => {
  const [thresholdData, setThresholdData] = useState(null);
  const [isThresholdAlertVisible, setThresholdAlertVisible] = useState(false);

  if (!cityData) {
    return <p>Loading weather data...</p>;
  }

  const temperature = convertTemperature(cityData.temperature, unit);

  useEffect(() => {
    if (thresholdData) {
      const thresholdTemp = convertTemperature(thresholdData.threshold, unit);
      const meetsCondition = thresholdData.condition === 'greater'
        ? temperature > thresholdTemp
        : temperature < thresholdTemp;

      setThresholdAlertVisible(meetsCondition);
    }
  }, [temperature, thresholdData, unit]);

  const handleThresholdChange = (newThresholdData) => {
    setThresholdData(newThresholdData);
    setThresholdAlertVisible(false);
  };

  return (
    <Card className="w-full h-full p-6 rounded-lg shadow-md bg-white border border-gray-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Weather App</h1>
            <h2 className="text-2xl font-semibold mt-2">{cityData.name || 'Unknown City'}</h2>
            <p className="text-gray-500">{new Date(cityData.date).toLocaleDateString() || 'N/A'}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-secondary/20 p-2 rounded-lg shadow-sm flex items-center space-x-2">
              <Button 
                variant={unit === 'C' ? 'default' : 'outline'} 
                onClick={() => onTemperatureUnitChange('C')}
                className={`
                  ${unit === 'C' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-secondary'}
                  transition-colors duration-200 font-medium px-4 py-2 rounded-md
                `}
              >
                °C
              </Button>
              <Button 
                variant={unit === 'F' ? 'default' : 'outline'} 
                onClick={() => onTemperatureUnitChange('F')}
                className={`
                  ${unit === 'F' ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-secondary'}
                  transition-colors duration-200 font-medium px-4 py-2 rounded-md
                `}
              >
                °F
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-start">
            <span className="text-8xl font-bold text-gray-800">
              {Math.round(temperature)}
            </span>
            <span className="text-4xl font-bold text-gray-800 mt-2">°{unit}</span>
          </div>
          <p className="text-2xl text-gray-600 mt-2">{cityData.condition || 'N/A'}</p>
        </div>
        
        <WeatherDetails cityData={cityData} unit={unit} />
        
        {isThresholdAlertVisible && (
          <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-md">
            <p>
              Alert: The current temperature is {thresholdData.condition} than the threshold of {thresholdData.threshold}°{unit}.
            </p>
          </div>
        )}

        {cityData.lat && cityData.lon ? (
          <WeeklyForecast lat={cityData.lat} lon={cityData.lon} unit={unit} />
        ) : (
          <p>No forecast data available.</p>
        )}
      </CardContent>
    </Card>
  );
};