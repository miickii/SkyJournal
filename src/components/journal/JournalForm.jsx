import { useState } from 'react';
import { locations, translations } from '../../utils/config';
import { saveJournalEntry } from '../../utils/storage';

const JournalForm = ({ weatherData, onEntryAdded, userLocation, showChineseText, isLoggedIn }) => {
  const [content, setContent] = useState('');
  const [showLanguageForm, setShowLanguageForm] = useState(false);
  const [languageEntry, setLanguageEntry] = useState({
    word: '',
    pronunciation: '',
    translation: '',
    example: ''
  });
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  
  const toggleLanguageForm = () => {
    setShowLanguageForm(!showLanguageForm);
  };
  
  const handleLanguageChange = (e) => {
    const { name, value } = e.target;
    setLanguageEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content) return;
    
    const newEntry = {
      id: Date.now(),
      content,
      date: new Date().toISOString(),
      location: userLocation,
      weather: weatherData?.weather[0]?.main || 'Unknown',
      languageEntry: showLanguageForm ? languageEntry : null
    };
    
    await saveJournalEntry(newEntry);
    
    // Reset form
    setContent('');
    setLanguageEntry({
      word: '',
      pronunciation: '',
      translation: '',
      example: ''
    });
    setShowLanguageForm(false);
    
    // Notify parent component
    if (onEntryAdded) {
      onEntryAdded(newEntry);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-0">
      <h2 className="text-lg font-medium mb-3">
        {t('addJournalEntry')} {locations[userLocation].emoji}
      </h2>
      
      {!isLoggedIn && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md border border-blue-200 dark:border-blue-800">
          <p className="text-sm">
            <span className="font-medium">💡 {t('localModeActive')}</span>
            <br />
            {t('signInToShare')}
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            id="content"
            rows="3"
            value={content}
            onChange={handleContentChange}
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 ${!isLoggedIn ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            placeholder={t('shareThoughts')}
            required
            disabled={!isLoggedIn}
          />
        </div>
        
        <div className="flex justify-between mb-3">
          <button
            type="button"
            onClick={toggleLanguageForm}
            className={`text-sm text-indigo-600 dark:text-indigo-400 hover:underline ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isLoggedIn}
          >
            {showLanguageForm 
              ? t('removeLanguageEntry')
              : `+ ${t('addLanguageWord')}`}
          </button>
          
          <button
            type="submit"
            className={`px-3 py-1 text-sm rounded-md border-0 bg-blue-600 text-white hover:bg-blue-700 ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isLoggedIn}
          >
            {t('shareJournalEntry')}
          </button>
        </div>
        
        {showLanguageForm && (
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg border-0 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  id="word"
                  name="word"
                  value={languageEntry.word}
                  onChange={handleLanguageChange}
                  placeholder={t('word')}
                  className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  required={showLanguageForm}
                />
              </div>
              
              <div>
                <input
                  type="text"
                  id="pronunciation"
                  name="pronunciation"
                  value={languageEntry.pronunciation}
                  onChange={handleLanguageChange}
                  placeholder={t('pronunciation')}
                  className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  id="translation"
                  name="translation"
                  value={languageEntry.translation}
                  onChange={handleLanguageChange}
                  placeholder={t('translation')}
                  className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  required={showLanguageForm}
                />
              </div>
              
              <div>
                <input
                  type="text"
                  id="example"
                  name="example"
                  value={languageEntry.example}
                  onChange={handleLanguageChange}
                  placeholder={t('exampleSentence')}
                  className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JournalForm; 