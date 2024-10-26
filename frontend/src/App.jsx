'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { WeatherApp } from './components/WeatherApp'
import { CitySelector } from './components/CitySelector'

export default function Page() {
  const [cities, setCities] = useState([]) // State to hold cities
  const [selectedCity, setSelectedCity] = useState(null)
  const [temperatureUnit, setTemperatureUnit] = useState('C')
  const [threshold, setThreshold] = useState(null)
  const [cityWeatherData, setCityWeatherData] = useState(null)

  // Fetch cities from API when the component mounts
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cities')
        const data = await response.json()
        setCities(data)
        setSelectedCity(data[0]) // Set the first city as the selected city
      } catch (error) {
        console.error("Error fetching cities:", error)
      }
    }

    fetchCities()
  }, [])

  // Fetch weather data whenever the selected city changes
  useEffect(() => {
    if (!selectedCity) return; // Don't fetch if no city is selected

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/weather/${selectedCity}`)
        const data = await response.json()
        setCityWeatherData({
          name: data.cityname,
          date: data.date,
          temperature: data.temp,
          feelsLike: data.feels_like,
          humidity: data.humidity,
          windSpeed: data.wind_speed,
          avgTemp: data.avg_temp,
          minTemp: data.min_temp,
          maxTemp: data.max_temp,
          condition: data.dominant_condition,
          lat: data.lat,
          lon: data.long
        })
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    }

    fetchWeatherData()
  }, [selectedCity])

  const handleCityChange = (city) => {
    setSelectedCity(city)
  }

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'C' ? 'F' : 'C')
  }

  const handleThresholdChange = (newThreshold) => {
    setThreshold(newThreshold)
  }

  const handleThresholdDelete = () => {
    setThreshold(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed bottom-4 left-4 z-10 md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <CitySelector cities={cities} onCityChange={handleCityChange} selectedCity={selectedCity} />
        </SheetContent>
      </Sheet>
      
      <div className="hidden md:block w-64">
        <CitySelector cities={cities} onCityChange={handleCityChange} selectedCity={selectedCity} />
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        {cityWeatherData ? (
          <WeatherApp 
            cityData={cityWeatherData}
            unit={temperatureUnit}
            threshold={threshold}
            onThresholdChange={handleThresholdChange}
            onThresholdDelete={handleThresholdDelete}
            onTemperatureUnitChange={toggleTemperatureUnit}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}
