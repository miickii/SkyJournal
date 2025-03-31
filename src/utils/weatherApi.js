import { WEATHER_API_KEY, WEATHER_CACHE_DURATION, LOCAL_STORAGE_KEYS } from './config';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// More realistic mock data
const MOCK_WEATHER = {
  denmark: {
    temp: 12,
    feels_like: 10,
    weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
    name: 'Copenhagen',
  },
  china: {
    temp: 24,
    feels_like: 26,
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    name: 'Ningde',
  }
};

// Get cached weather data
const getCachedWeather = (city) => {
  try {
    const cachedData = localStorage.getItem(LOCAL_STORAGE_KEYS.WEATHER_CACHE);
    if (!cachedData) return null;
    
    const weatherCache = JSON.parse(cachedData);
    const cityCache = weatherCache[city];
    
    if (!cityCache) return null;
    
    // Check if cache is still valid
    const now = new Date().getTime();
    if (now - cityCache.timestamp > WEATHER_CACHE_DURATION) {
      return null; // Cache expired
    }
    
    return cityCache.data;
  } catch (error) {
    console.error('Error getting cached weather:', error);
    return null;
  }
};

// Set cached weather data
const setCachedWeather = (city, data) => {
  try {
    // Get existing cache
    const cachedData = localStorage.getItem(LOCAL_STORAGE_KEYS.WEATHER_CACHE);
    const weatherCache = cachedData ? JSON.parse(cachedData) : {};
    
    // Update cache for this city
    weatherCache[city] = {
      data,
      timestamp: new Date().getTime()
    };
    
    localStorage.setItem(LOCAL_STORAGE_KEYS.WEATHER_CACHE, JSON.stringify(weatherCache));
  } catch (error) {
    console.error('Error caching weather data:', error);
  }
};

export const fetchWeatherByCity = async (city) => {
  // Check cache first
  const cachedData = getCachedWeather(city);
  if (cachedData) {
    console.log(`Using cached weather data for ${city}`);
    return cachedData;
  }
  
  // Return mock data if API key is not set or in case of errors
  const useApiKey = WEATHER_API_KEY && WEATHER_API_KEY !== 'YOUR_OPENWEATHERMAP_API_KEY';
  
  if (!useApiKey) {
    console.log(`Using mock weather data for ${city}`);
    if (city.includes('Copenhagen') || city === 'Denmark') return MOCK_WEATHER.denmark;
    if (city.includes('Ningde') || city === 'China') return MOCK_WEATHER.china;
    return MOCK_WEATHER.denmark; // default fallback
  }
  
  try {
    console.log(`Fetching fresh weather data for ${city}`);
    const response = await fetch(
      `${WEATHER_BASE_URL}/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Weather data fetch failed: ${response.status}`);
    }
    
    const data = await response.json();
    const weatherData = {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      weather: data.weather,
      name: data.name,
    };
    
    // Cache the results
    setCachedWeather(city, weatherData);
    
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather:', error);
    
    // Fallback to mock data on error
    if (city.includes('Copenhagen') || city === 'Denmark') return MOCK_WEATHER.denmark;
    if (city.includes('Ningde') || city === 'China') return MOCK_WEATHER.china;
    return MOCK_WEATHER.denmark; // default fallback
  }
};

export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}; 