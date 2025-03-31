import { useState, useEffect } from 'react';
import JournalEntry from './JournalEntry';
import { getJournalEntries, clearJournalEntries } from '../../utils/storage';
import { locations, translations } from '../../utils/config';

const JournalList = ({ selectedLocation, refreshTrigger, showChineseText, onEntriesCleared }) => {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'denmark', 'china'
  const [loading, setLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  const loadEntries = async () => {
    try {
      setLoading(true);
      const allEntries = await getJournalEntries();
      // Ensure we have an array
      if (Array.isArray(allEntries)) {
        setEntries(allEntries);
      } else {
        console.error("Entries is not an array:", allEntries);
        setEntries([]);
      }
    } catch (error) {
      console.error("Error loading entries:", error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadEntries();
  }, [refreshTrigger]);
  
  const handleClearEntries = async () => {
    if (window.confirm(t('confirmClearMessages'))) {
      setIsClearing(true);
      try {
        await clearJournalEntries();
        setEntries([]);
        if (onEntriesCleared) {
          onEntriesCleared();
        }
      } catch (error) {
        console.error("Error clearing entries:", error);
      } finally {
        setIsClearing(false);
      }
    }
  };
  
  const filteredEntries = () => {
    // Make sure entries is always an array before filtering
    if (!Array.isArray(entries)) return [];
    
    if (filter === 'all') {
      return entries;
    }
    return entries.filter(entry => entry.location === filter);
  };
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  
  return (
    <div className="mt-6">
      <div className="flex items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold mr-4">{t('journalEntries')}</h2>
        
        <div className="flex gap-2">
          <button
            className={`px-2 py-1 text-sm rounded-md border-0 ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleFilterChange('all')}
          >
            {t('all')}
          </button>
          <button
            className={`px-2 py-1 text-sm rounded-md border-0 ${
              filter === 'denmark'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleFilterChange('denmark')}
          >
            {locations.denmark.emoji}
          </button>
          <button
            className={`px-2 py-1 text-sm rounded-md border-0 ${
              filter === 'china'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleFilterChange('china')}
          >
            {locations.china.emoji}
          </button>
        </div>
        
        <div className="ml-auto">
          <button
            className="px-3 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 flex items-center"
            onClick={handleClearEntries}
            disabled={isClearing || loading || entries.length === 0}
          >
            {isClearing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('clearing')}
              </span>
            ) : (
              <span>🗑️ {t('clearMessages')}</span>
            )}
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center border-0">
          <p className="text-gray-500 dark:text-gray-400">Loading entries...</p>
        </div>
      ) : filteredEntries().length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center border-0">
          <p className="text-gray-500 dark:text-gray-400">
            {showChineseText ? "还没有日记。写点什么吧！" : "No entries yet. Write something!"}
          </p>
        </div>
      ) : (
        <div>
          {filteredEntries()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(entry => (
              <JournalEntry key={entry.id} entry={entry} showChineseText={showChineseText} />
            ))}
        </div>
      )}
    </div>
  );
};

export default JournalList; 