import React from 'react';
import Search from '../components/Search';
import Weather from '../components/Weather';
import { useFetchWeather } from '../hooks/useFetchWeather';

const Home: React.FC = () => {
  const { weatherData, fetchWeather, loading, error } = useFetchWeather();

  return (
    <div>
      <h1>Weather App (Today’s 3-Hour Forecast + 7-Day Forecast)</h1>
      <Search onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && <Weather weatherData={weatherData} />}
    </div>
  );
};

export default Home;
