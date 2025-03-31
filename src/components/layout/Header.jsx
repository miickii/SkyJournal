import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { DEFAULT_USER, locations, translations } from '../../utils/config';
import { setUserLocation, getUserLocation } from '../../utils/storage';
import { useDarkMode } from '../../hooks/useDarkMode';

const Header = ({ onLocationChange, showChineseText, onToggleChineseText }) => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [userLocation, setUserLocationState] = useState(
    getUserLocation() || DEFAULT_USER
  );
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const changeUserLocation = (location) => {
    setUserLocationState(location);
    setUserLocation(location);
    
    if (onLocationChange) {
      onLocationChange(location);
    }
  };
  
  const otherLocation = userLocation === 'denmark' ? 'china' : 'denmark';
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 mb-6 border-0">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {t('appTitle')}
          </h1>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeUserLocation('denmark')}
              className={`p-2 rounded-md ${
                locations.denmark.emoji === '🇩🇰' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'
              }`}
              aria-label="Switch to Denmark"
            >
              {locations.denmark.emoji}
            </button>
            
            <button
              onClick={() => changeUserLocation('china')}
              className={`p-2 rounded-md ${
                locations.china.emoji === '🇨🇳' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'
              }`}
              aria-label="Switch to China"
            >
              {locations.china.emoji}
            </button>
          </div>
          
          <button
            onClick={onToggleChineseText}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center"
            aria-label="Toggle language"
          >
            {showChineseText ? <FiToggleRight className="text-indigo-500" /> : <FiToggleLeft />}
            <span className="ml-1">{t('showChinese')}</span>
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-indigo-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 