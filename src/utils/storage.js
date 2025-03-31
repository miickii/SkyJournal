import { LOCAL_STORAGE_KEYS, API_URL } from './config';

// Save a journal entry
export const saveJournalEntry = async (entry) => {
  try {
    // First save to localStorage for immediate access
    const existingEntries = getJournalEntriesFromLocalStorage();
    const newEntries = [...existingEntries, entry];
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES, 
      JSON.stringify(newEntries)
    );
    
    // Then sync to API
    try {
      await fetch(`${API_URL}/api/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntries)
      });
    } catch (apiError) {
      console.error('Error syncing to API:', apiError);
      // Still return success as we saved locally
    }
    
    return true;
  } catch (error) {
    console.error('Error saving journal entry:', error);
    return false;
  }
};

// Get journal entries (from API with fallback to localStorage)
export const getJournalEntries = async () => {
  try {
    // Try to get from API first
    const response = await fetch(`${API_URL}/api/entries`);
    if (response.ok) {
      const entries = await response.json();
      // Update local storage
      localStorage.setItem(LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
      return entries;
    }
  } catch (error) {
    console.error('Error fetching entries from API:', error);
  }
  
  // Fallback to localStorage
  return getJournalEntriesFromLocalStorage();
};

// Helper function to get entries from localStorage only
const getJournalEntriesFromLocalStorage = () => {
  try {
    const entries = localStorage.getItem(LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error getting journal entries from localStorage:', error);
    return [];
  }
};

export const getJournalEntriesByLocation = (location) => {
  const entries = getJournalEntriesFromLocalStorage();
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