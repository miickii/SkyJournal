import { useState, useEffect } from 'react';
import { getJournalEntries, clearJournalEntries } from '../../utils/storage';
import { locations, translations } from '../../utils/config';

const LanguageCollection = ({ showChineseText }) => {
  const [messages, setMessages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const entries = await getJournalEntries();
      
      // Ensure entries is an array before filtering
      if (!Array.isArray(entries)) {
        console.error('Journal entries is not an array:', entries);
        setMessages([]);
        return;
      }
      
      const cards = entries
        .filter(entry => entry.languageEntry)
        .map(entry => ({
          ...entry.languageEntry,
          language: entry.location,
          id: entry.id,
          date: entry.date
        }))
        // Sort by date, newest first
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setMessages(cards);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Extract language messages from journal entries
    fetchEntries();
  }, []);
  
  const handleClearMessages = async () => {
    if (window.confirm(t('confirmClearMessages'))) {
      setIsClearing(true);
      try {
        await clearJournalEntries();
        setMessages([]);
      } catch (error) {
        console.error('Error clearing messages:', error);
      } finally {
        setIsClearing(false);
      }
    }
  };
  
  const filteredMessages = 
    !Array.isArray(messages) ? [] :
    selectedLanguage === 'all'
      ? messages
      : messages.filter(message => message.language === selectedLanguage);
  
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };
  
  // Format date for display with relative time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    // Today or yesterday
    if (diffDays === 0) {
      if (diffMins < 5) {
        return t('justNow');
      } else if (diffHours === 0) {
        return `${diffMins} ${t('minutesAgo')}`;
      } else {
        return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      }
    } else if (diffDays === 1) {
      return `${t('yesterday')} ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric'
      }) + ' ' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    }
  };
  
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border-0">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {t('loading')}
        </p>
      </div>
    );
  }
  
  if (filteredMessages.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border-0">
        <h2 className="text-xl font-semibold mb-4">{t('languageMessages')}</h2>
        <div className="py-8">
          <span className="text-5xl mb-4 block">🫥</span>
          <p className="text-gray-500 dark:text-gray-400">
            {t('noMessagesYet')}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-0">
      <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{t('languageMessages')}</h2>
          
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                selectedLanguage === 'all'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => handleLanguageChange('all')}
            >
              {t('all')}
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full flex items-center ${
                selectedLanguage === 'denmark'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => handleLanguageChange('denmark')}
            >
              <span className="mr-1">{locations.denmark.emoji}</span>
              <span>{locations.denmark.language}</span>
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full flex items-center ${
                selectedLanguage === 'china'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
              onClick={() => handleLanguageChange('china')}
            >
              <span className="mr-1">{locations.china.emoji}</span>
              <span>{locations.china.language}</span>
            </button>
          </div>
        </div>
        
        <div className="mt-3 flex justify-end">
          <button
            className="px-3 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 flex items-center"
            onClick={handleClearMessages}
            disabled={isClearing || loading}
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
      
      <div className="max-h-[500px] overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.language === 'denmark' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] ${
                message.language === 'denmark' 
                  ? 'bg-gray-100 dark:bg-gray-700 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl' 
                  : 'bg-indigo-100 dark:bg-indigo-900 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl'
              } p-4 shadow-sm`}>
                <div className="flex items-center mb-1">
                  <span className="mr-1">{locations[message.language].emoji}</span>
                  <span className="font-medium">{message.word}</span>
                </div>
                
                {message.pronunciation && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-6 -mt-1 mb-2">
                    [{message.pronunciation}]
                  </p>
                )}
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mt-2 border dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">{message.translation}</p>
                </div>
                
                {message.example && message.example.trim() !== "" && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-2 ml-2">
                    "{message.example}"
                  </p>
                )}
                
                <div className="text-right mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(message.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageCollection;