import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Components
import Header from './components/layout/Header';
import TimeComparison from './components/weather/TimeComparison';
import WeatherCard from './components/weather/WeatherCard';
import JournalForm from './components/journal/JournalForm';
import JournalList from './components/journal/JournalList';
import LanguageCollection from './components/language/LanguageCollection';

// Utils and hooks
import { DEFAULT_USER } from './utils/config';
import { getUserLocation } from './utils/storage';
import { useWeather } from './hooks/useWeather';

function App() {
  const [userLocation, setUserLocation] = useState(getUserLocation() || DEFAULT_USER);
  const [refreshJournalList, setRefreshJournalList] = useState(0);
  const [showChineseText, setShowChineseText] = useState(false);
  const { weatherData } = useWeather(userLocation);
  
  // Determine the other location
  const otherLocation = userLocation === 'denmark' ? 'china' : 'denmark';
  
  const handleLocationChange = (location) => {
    setUserLocation(location);
  };
  
  const handleJournalAdded = () => {
    // Trigger a refresh of the journal list
    setRefreshJournalList(prev => prev + 1);
  };

  const toggleChineseText = () => {
    setShowChineseText(!showChineseText);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-10">
      <Header 
        onLocationChange={handleLocationChange} 
        showChineseText={showChineseText}
        onToggleChineseText={toggleChineseText}
      />
      
      <main className="container mx-auto px-4">
        <TimeComparison showChineseText={showChineseText} />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <WeatherCard locationKey={userLocation} showChineseText={showChineseText} />
          <WeatherCard locationKey={otherLocation} showChineseText={showChineseText} />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="lg:col-span-2">
            <JournalForm 
              weatherData={weatherData} 
              onEntryAdded={handleJournalAdded}
              userLocation={userLocation}
              showChineseText={showChineseText}
            />
            <JournalList 
              selectedLocation={userLocation} 
              refreshTrigger={refreshJournalList}
              showChineseText={showChineseText} 
            />
          </div>
          
          <div>
            <LanguageCollection showChineseText={showChineseText} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
