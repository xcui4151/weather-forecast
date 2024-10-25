import React from 'react';
import { WeatherData, HourlyForecast } from '../types/weatherTypes';

interface WeatherProps {
  weatherData: WeatherData;
}

const Weather: React.FC<WeatherProps> = ({ weatherData }) => {
  const { location, current, forecast } = weatherData;

  // Today's forecast and hourly data
  const todayForecast = forecast.forecastday[0];
  const hourlyData: HourlyForecast[] = todayForecast.hour.filter((_, index) => index % 3 === 0); // Every 3 hours

  return (
    <div>
      <h2>Weather in {location.name}, {location.country}</h2>
      <p>Temperature: {current.temp_c}°C</p>
      <p>Condition: {current.condition.text}</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Wind Speed: {current.wind_kph} kph</p>
      <img src={current.condition.icon} alt="weather icon" />

      <h3>Today's 3-Hour Forecast</h3>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
        {hourlyData.map((hour, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', minWidth: '100px' }}>
            <p><strong>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></p>
            <img src={hour.condition.icon} alt="hourly forecast icon" />
            <p>{hour.condition.text}</p>
            <p>Temp: {hour.temp_c}°C</p>
            <p>Chance of Rain: {hour.chance_of_rain}%</p>
          </div>
        ))}
      </div>

      <h3>7-Day Forecast (Including Today)</h3>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
        {forecast.forecastday.map((day, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', minWidth: '120px' }}>
            <p><strong>{day.date}</strong></p>
            <img src={day.day.condition.icon} alt="daily forecast icon" />
            <p>{day.day.condition.text}</p>
            <p>Max: {day.day.maxtemp_c}°C</p>
            <p>Min: {day.day.mintemp_c}°C</p>
            <p>Chance of Rain: {day.day.daily_chance_of_rain}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
