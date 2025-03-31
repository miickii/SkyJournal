import { useState, useEffect } from 'react';
import JournalEntry from './JournalEntry';
import { getJournalEntries } from '../../utils/storage';
import { locations, translations } from '../../utils/config';

const JournalList = ({ selectedLocation, refreshTrigger, showChineseText }) => {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'denmark', 'china'
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  useEffect(() => {
    const loadEntries = async () => {
      const allEntries = await getJournalEntries();
      setEntries(allEntries);
    };
    
    loadEntries();
  }, [refreshTrigger]);
  
  const filteredEntries = () => {
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
      </div>
      
      {filteredEntries().length === 0 ? (
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