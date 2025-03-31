import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getJournalEntries } from '../../utils/storage';
import { locations, translations } from '../../utils/config';

const LanguageCollection = ({ showChineseText }) => {
  const [languageCards, setLanguageCards] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  useEffect(() => {
    // Extract language cards from journal entries
    const entries = getJournalEntries();
    const cards = entries
      .filter(entry => entry.languageEntry)
      .map(entry => ({
        ...entry.languageEntry,
        language: entry.location,
        id: entry.id,
        date: entry.date
      }));
    
    setLanguageCards(cards);
    setCurrentCardIndex(0);
  }, []);
  
  const filteredCards = 
    selectedLanguage === 'all'
      ? languageCards
      : languageCards.filter(card => card.language === selectedLanguage);
  
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };
  
  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= filteredCards.length ? 0 : nextIndex;
    });
  };
  
  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prevIndex => {
      const prevCardIndex = prevIndex - 1;
      return prevCardIndex < 0 ? filteredCards.length - 1 : prevCardIndex;
    });
  };
  
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  if (filteredCards.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center border-0">
        <h2 className="text-xl font-semibold mb-4">{t('languageCards')}</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {t('noCardsYet')}
        </p>
      </div>
    );
  }
  
  const currentCard = filteredCards[currentCardIndex];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('languageCards')}</h2>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md border-0 ${
              selectedLanguage === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleLanguageChange('all')}
          >
            {t('all')}
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md flex items-center border-0 ${
              selectedLanguage === 'denmark'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleLanguageChange('denmark')}
          >
            <span className="mr-1">{locations.denmark.emoji}</span>
            <span>{locations.denmark.language}</span>
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md flex items-center border-0 ${
              selectedLanguage === 'china'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleLanguageChange('china')}
          >
            <span className="mr-1">{locations.china.emoji}</span>
            <span>{locations.china.language}</span>
          </button>
        </div>
      </div>
      
      <div className="flex justify-center">
        <motion.div 
          className={`w-full max-w-md h-64 cursor-pointer bg-indigo-50 dark:bg-indigo-950 rounded-xl shadow-lg overflow-hidden relative border-0 ${
            isFlipped ? 'bg-white dark:bg-gray-900' : ''
          }`}
          onClick={toggleFlip}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ perspective: 1000 }}
        >
          {/* Front of card */}
          <motion.div 
            className="absolute inset-0 p-6 flex flex-col justify-center items-center backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              display: isFlipped ? 'none' : 'flex'
            }}
          >
            <span className="text-xs text-gray-500 dark:text-gray-400 absolute top-3 right-3">
              {locations[currentCard.language].emoji} {currentCardIndex + 1}/{filteredCards.length}
            </span>
            <h3 className="text-3xl font-bold mb-2">{currentCard.word}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">[{currentCard.pronunciation}]</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 absolute bottom-3 left-0 right-0 text-center">
              {t('tapToSeeTranslation')}
            </p>
          </motion.div>
          
          {/* Back of card */}
          <motion.div 
            className="absolute inset-0 p-6 flex flex-col justify-center items-center backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              rotateY: 180,
              display: isFlipped ? 'flex' : 'none'
            }}
          >
            <span className="text-xs text-gray-500 dark:text-gray-400 absolute top-3 right-3">
              {locations[currentCard.language].emoji} {currentCardIndex + 1}/{filteredCards.length}
            </span>
            <h3 className="text-2xl font-bold mb-2">{currentCard.translation}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center p-3 bg-white dark:bg-gray-800 rounded-lg border-0">
              "{currentCard.example}"
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 absolute bottom-3 left-0 right-0 text-center">
              {t('tapToSeeWord')}
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-4">
        <button 
          onClick={handlePrevCard}
          className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-md border-0"
          disabled={filteredCards.length <= 1}
        >
          {t('previous')}
        </button>
        <button 
          onClick={handleNextCard}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md border-0"
          disabled={filteredCards.length <= 1}
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default LanguageCollection; 