import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { locations, translations } from '../../utils/config';
import { 
  getTimeUntilMidnight,
  getMidnightForTimezone,
  formatTimeForTimezone,
  getCurrentTimeInTimezone
} from '../../utils/dateUtils';

const Countdown = ({ otherLocation, showChineseText }) => {
  const [timeUntil, setTimeUntil] = useState('');
  const [midnightTime, setMidnightTime] = useState('');
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  useEffect(() => {
    const updateTime = () => {
      const timeLeft = getTimeUntilMidnight(locations[otherLocation].timezone);
      setTimeUntil(timeLeft);
      
      const midnight = getMidnightForTimezone(locations[otherLocation].timezone);
      const formattedMidnight = formatTimeForTimezone(
        midnight, 
        locations[otherLocation].timezone, 
        'HH:mm'
      );
      setMidnightTime(formattedMidnight);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [otherLocation]);
  
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FiClock className="text-indigo-500" />
          <h3 className="text-lg font-medium">
            {t('nextJournalFrom')} {locations[otherLocation].name} {locations[otherLocation].emoji}
          </h3>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('availableAt')} {midnightTime} ({locations[otherLocation].name} {t('time')})
          </p>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {t('in')} {timeUntil}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Countdown; 