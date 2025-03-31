import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { locations, translations } from '../../utils/config';
import { 
  getCurrentTimeInTimezone, 
  formatTimeForTimezone, 
  isDaytime
} from '../../utils/dateUtils';

const TimeComparison = ({ showChineseText }) => {
  const [times, setTimes] = useState({
    denmark: '',
    china: '',
    isDayDenmark: true,
    isDayChina: true
  });
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  useEffect(() => {
    const updateTimes = () => {
      const denmarkTime = getCurrentTimeInTimezone(locations.denmark.timezone);
      const chinaTime = getCurrentTimeInTimezone(locations.china.timezone);
      
      setTimes({
        denmark: formatTimeForTimezone(denmarkTime, locations.denmark.timezone),
        china: formatTimeForTimezone(chinaTime, locations.china.timezone),
        isDayDenmark: isDaytime(locations.denmark.timezone),
        isDayChina: isDaytime(locations.china.timezone)
      });
    };
    
    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="flex justify-between gap-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg shadow-md flex-1 relative overflow-hidden border-0">
        <div 
          className={`absolute inset-0 opacity-10 ${times.isDayDenmark ? 'bg-yellow-400' : 'bg-indigo-900'}`}
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="font-medium text-lg">{showChineseText ? locations.denmark.nameChinese : locations.denmark.name} {locations.denmark.emoji}</span>
            {times.isDayDenmark ? 
              <FiSun className="text-yellow-500" size={20} /> : 
              <FiMoon className="text-indigo-300" size={20} />
            }
          </div>
          <div className="text-3xl font-bold mt-1">{times.denmark}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('localTime')}</div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-800 p-4 rounded-lg shadow-md flex-1 relative overflow-hidden border-0">
        <div 
          className={`absolute inset-0 opacity-10 ${times.isDayChina ? 'bg-yellow-400' : 'bg-indigo-900'}`}
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="font-medium text-lg">{showChineseText ? locations.china.nameChinese : locations.china.name} {locations.china.emoji}</span>
            {times.isDayChina ? 
              <FiSun className="text-yellow-500" size={20} /> : 
              <FiMoon className="text-indigo-300" size={20} />
            }
          </div>
          <div className="text-3xl font-bold mt-1">{times.china}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('localTime')}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeComparison; 