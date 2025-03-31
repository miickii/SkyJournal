import { useState } from 'react';
import { format } from 'date-fns';
import { locations, translations } from '../../utils/config';
import { getCurrentTimeInTimezone, formatTimeForTimezone } from '../../utils/dateUtils';

const JournalEntry = ({ entry, showChineseText }) => {
  const [showLanguageCard, setShowLanguageCard] = useState(false);
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };
  
  const getTimeForLocation = (dateString, locationKey) => {
    const date = new Date(dateString);
    return formatTimeForTimezone(date, locations[locationKey].timezone);
  };
  
  const toggleLanguageCard = () => {
    setShowLanguageCard(!showLanguageCard);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-3 border-0">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="flex items-center gap-1 text-base">
            {locations[entry.location].emoji} <span className="text-gray-600 dark:text-gray-300">{formatDate(entry.date)}</span>
          </div>
        </div>
        
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs py-1 px-2 rounded-full border-0">
          {entry.weather}
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-2">{entry.content}</p>
      
      {entry.languageEntry && (
        <div className="mt-2">
          <button
            onClick={toggleLanguageCard}
            className="text-indigo-600 dark:text-indigo-400 text-xs hover:underline"
          >
            {showLanguageCard ? "- " : "+ "}
            {locations[entry.location].language} {showChineseText ? "单词" : "word"}
          </button>
          
          {showLanguageCard && (
            <div className="mt-2 bg-indigo-50 dark:bg-indigo-950 p-3 rounded-lg border-0">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span className="font-medium">{entry.languageEntry.word}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    [{entry.languageEntry.pronunciation}]
                  </span>
                </div>
                <p className="text-sm mt-1">{entry.languageEntry.translation}</p>
                <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded border-0">
                  <p className="text-xs italic">"{entry.languageEntry.example}"</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JournalEntry; 