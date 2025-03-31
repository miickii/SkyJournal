import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Components
import Header from './components/layout/Header';
import TimeComparison from './components/weather/TimeComparison';
import WeatherCard from './components/weather/WeatherCard';
import JournalForm from './components/journal/JournalForm';
import JournalList from './components/journal/JournalList';
import LanguageCollection from './components/language/LanguageCollection';
import SimpleLogin from './components/auth/SimpleLogin';

// Utils and hooks
import { DEFAULT_USER } from './utils/config';
import { getUserLocation, getJournalEntries } from './utils/storage';
import { useWeather } from './hooks/useWeather';
import { isLoggedIn } from './utils/simpleAuth';
import { isConfigured } from './utils/githubStorage';

function App() {
  const [userLocation, setUserLocation] = useState(getUserLocation() || DEFAULT_USER);
  const [refreshJournalList, setRefreshJournalList] = useState(0);
  const [showChineseText, setShowChineseText] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn());
  const { weatherData } = useWeather(userLocation);
  
  // Log GitHub Gist configuration status on startup
  useEffect(() => {
    if (isConfigured()) {
      console.log('GitHub Gist storage is configured and will be used for message sync');
    } else {
      console.log('GitHub Gist storage is not configured. Using local storage only.');
    }
  }, []);
  
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
  
  const handleLoginStateChange = (loggedIn) => {
    setIsUserLoggedIn(loggedIn);
    if (loggedIn) {
      // If user just logged in, refresh the entries
      setRefreshJournalList(prev => prev + 1);
    }
  };

  // Add this useEffect to periodically fetch entries
  useEffect(() => {
    // Function to fetch entries
    const fetchEntries = async () => {
      try {
        await getJournalEntries(); // This will try GitHub Gist, then local encrypted storage
        setRefreshJournalList(prev => prev + 1);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };
    
    // Initial fetch
    fetchEntries();
    
    // Set up periodic fetching (every 30 seconds)
    const interval = setInterval(fetchEntries, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-10">
      <Header 
        onLocationChange={handleLocationChange} 
        showChineseText={showChineseText}
        onToggleChineseText={toggleChineseText}
      >
        <SimpleLogin 
          showChineseText={showChineseText} 
          onLoginStateChange={handleLoginStateChange} 
        />
      </Header>
      
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
              isLoggedIn={isUserLoggedIn}
            />
            <JournalList 
              selectedLocation={userLocation} 
              refreshTrigger={refreshJournalList}
              showChineseText={showChineseText}
              onEntriesCleared={handleJournalAdded}
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
