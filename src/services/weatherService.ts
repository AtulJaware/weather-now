import type { WeatherData } from '../types/weather';

const API_KEY = 'fcfc93fc608ea77b77e54c92c0772857';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeather(cityOrCoords: string): Promise<WeatherData> {
  let url: string;

  if (cityOrCoords.includes(',')) {
    const [lat, lon] = cityOrCoords.split(',');
    url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  } else {
    url = `${BASE_URL}?q=${encodeURIComponent(cityOrCoords)}&units=metric&appid=${API_KEY}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }

  const data = await response.json();
  return data;
}
