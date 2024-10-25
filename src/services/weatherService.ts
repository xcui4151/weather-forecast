import axios from 'axios';
import { WeatherData } from '../types/weatherTypes';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  const response = await axios.get<WeatherData>(`${BASE_URL}?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`);
  return response.data;
};
