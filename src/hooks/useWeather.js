import { useState, useEffect } from 'react';
import { fetchWeatherByCity } from '../utils/weatherApi';
import { locations, WEATHER_CACHE_DURATION } from '../utils/config';

export const useWeather = (selectedLocation) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const location = locations[selectedLocation];
        const data = await fetchWeatherByCity(location.name);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh weather data less frequently (every 3 hours instead of 30 minutes)
    // This is much longer than the cache duration to ensure we respect API limits
    const interval = setInterval(fetchData, 3 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [selectedLocation]);

  return { weatherData, loading, error };
}; 