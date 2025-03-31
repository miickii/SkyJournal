import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiCloud, FiCloudRain, FiCloudSnow } from 'react-icons/fi';
import { useWeather } from '../../hooks/useWeather';
import { locations, translations } from '../../utils/config';
import { 
  getCurrentTimeInTimezone, 
  formatTimeForTimezone, 
  isDaytime 
} from '../../utils/dateUtils';
import { getWeatherIcon } from '../../utils/weatherApi';

const WeatherCard = ({ locationKey, showChineseText }) => {
  const { weatherData, loading, error } = useWeather(locationKey);
  const location = locations[locationKey];
  const isDay = isDaytime(location.timezone);
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  if (loading) {
    return (
      <div className="rounded-lg p-6 shadow-md h-60 flex items-center justify-center bg-blue-50 dark:bg-blue-900 border-0">
        <p className="text-blue-600 dark:text-blue-300">Loading weather data...</p>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="rounded-lg p-6 shadow-md h-60 flex items-center justify-center bg-red-50 dark:bg-red-900 border-0">
        <p className="text-red-600 dark:text-red-300">
          {error || 'Failed to load weather data'}
        </p>
      </div>
    );
  }
  
  const currentTime = getCurrentTimeInTimezone(location.timezone);
  const formattedTime = formatTimeForTimezone(currentTime, location.timezone, 'HH:mm');
  const weather = weatherData.weather[0];
  
  // Get the appropriate weather icon
  const getWeatherComponent = () => {
    const weatherType = weather.main.toLowerCase();
    
    if (weatherType.includes('clear')) {
      return isDay ? <FiSun className="text-yellow-400 text-4xl" /> : <FiMoon className="text-yellow-100 text-4xl" />;
    } else if (weatherType.includes('cloud')) {
      return <FiCloud className="text-gray-400 text-4xl" />;
    } else if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
      return <FiCloudRain className="text-blue-400 text-4xl" />;
    } else if (weatherType.includes('snow')) {
      return <FiCloudSnow className="text-white text-4xl" />;
    } else {
      return <img src={getWeatherIcon(weather.icon)} alt={weather.description} className="w-16 h-16" />;
    }
  };
  
  const bgColor = isDay 
    ? 'bg-gradient-to-br from-blue-300 to-blue-100' 
    : 'bg-gradient-to-br from-blue-900 to-indigo-900';
  
  const textColor = isDay ? 'text-blue-900' : 'text-white';
  
  return (
    <motion.div 
      className={`rounded-2xl shadow-lg p-6 border-0 ${bgColor} ${textColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold mb-1 flex items-center">
            {location.name} {location.emoji}
          </h3>
          <p className="text-sm opacity-80">
            {t('localTime')} {formattedTime}
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          {getWeatherComponent()}
          <p className="text-sm mt-1 capitalize">{weather.description}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-end">
          <span className="text-4xl font-bold">{Math.round(weatherData.temp)}°C</span>
          <span className="ml-2 text-sm opacity-80">{t('feelsLike')} {Math.round(weatherData.feels_like)}°C</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard; 