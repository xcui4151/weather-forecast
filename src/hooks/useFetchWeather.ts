import { useState } from 'react';
import { fetchWeatherData } from '../services/weatherService';
import { WeatherData } from '../types/weatherTypes';

export const useFetchWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, fetchWeather, loading, error };
};
