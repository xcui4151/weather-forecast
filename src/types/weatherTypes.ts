export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface HourlyForecast {
  time: string;
  temp_c: number;
  chance_of_rain: number;
  condition: WeatherCondition;
}

export interface DailyForecast {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    condition: WeatherCondition;
  };
  hour: HourlyForecast[];
}

export interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    condition: WeatherCondition;
  };
  forecast: {
    forecastday: DailyForecast[];
  };
}