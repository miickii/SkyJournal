import { LOCAL_STORAGE_KEYS } from './config';

export const saveJournalEntry = (entry) => {
  try {
    const existingEntries = getJournalEntries();
    const newEntries = [...existingEntries, entry];
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES,
      JSON.stringify(newEntries)
    );
    return true;
  } catch (error) {
    console.error('Error saving journal entry:', error);
    return false;
  }
};

export const getJournalEntries = () => {
  try {
    const entries = localStorage.getItem(LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error getting journal entries:', error);
    return [];
  }
};

export const getJournalEntriesByLocation = (location) => {
  const entries = getJournalEntries();
  return entries.filter(entry => entry.location === location);
};

export const saveLanguageCard = (card) => {
  try {
    const existingCards = getLanguageCards();
    const newCards = [...existingCards, card];
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.LANGUAGE_CARDS, 
      JSON.stringify(newCards)
    );
    return true;
  } catch (error) {
    console.error('Error saving language card:', error);
    return false;
  }
};

export const getLanguageCards = () => {
  try {
    const cards = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE_CARDS);
    return cards ? JSON.parse(cards) : [];
  } catch (error) {
    console.error('Error getting language cards:', error);
    return [];
  }
};

export const getLanguageCardsByLanguage = (language) => {
  const cards = getLanguageCards();
  return cards.filter(card => card.language === language);
};

export const setUserLocation = (location) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER_LOCATION, location);
};

export const getUserLocation = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.USER_LOCATION);
}; 