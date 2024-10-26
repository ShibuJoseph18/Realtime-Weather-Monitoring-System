import { Wind, Droplet, Thermometer, ArrowUp, ArrowDown, ThermometerSun } from 'lucide-react';

const convertTemperature = (temp, unit) => {
  // Assuming `temp` is in Kelvin by default
  const tempInCelsius = temp - 273.15;
  return unit === 'F' ? (tempInCelsius * 9/5) + 32 : tempInCelsius;
};

export const WeatherDetails = ({ cityData, unit }) => {
  // Ensure cityData is valid
  if (!cityData) {
    return null; // or a loading message
  }

  const details = [
    { icon: <Thermometer className="w-5 h-5" />, label: "Feels like", value: `${Math.round(convertTemperature(cityData.feelsLike, unit))}°${unit}` },
    { icon: <Wind className="w-5 h-5" />, label: "Wind speed", value: `${cityData.windSpeed} mph` },
    { icon: <Droplet className="w-5 h-5" />, label: "Humidity", value: `${cityData.humidity}%` },
    { icon: <ThermometerSun className="w-5 h-5" />, label: "Avg temp", value: `${Math.round(convertTemperature(cityData.avgTemp, unit))}°${unit}` },
    { icon: <ArrowDown className="w-5 h-5" />, label: "Min temp", value: `${Math.round(convertTemperature(cityData.minTemp, unit))}°${unit}` },
    { icon: <ArrowUp className="w-5 h-5" />, label: "Max temp", value: `${Math.round(convertTemperature(cityData.maxTemp, unit))}°${unit}` },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center space-x-2 bg-secondary rounded-lg p-3">
          <div className="text-primary">{detail.icon}</div>
          <div>
            <p className="text-xs text-muted-foreground">{detail.label}</p>
            <p className="font-medium">{detail.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
