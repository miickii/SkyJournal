import { LOCAL_STORAGE_KEYS } from './config';
import { 
  isLoggedIn, 
  getData, 
  saveData,
  clearData
} from './simpleAuth';

import {
  isConfigured,
  getMessagesFromGist,
  saveMessagesToGist
} from './githubStorage';

// Detect if we're running in development mode (localhost)
const isDevelopmentEnv = () => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1';
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

// Save a journal entry
export const saveJournalEntry = async (entry) => {
  try {
    // First save to localStorage
    const existingEntries = await getJournalEntriesFromLocalStorage();
    const newEntries = [...existingEntries, entry];
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES, 
      JSON.stringify(newEntries)
    );
    
    // If the user is logged in, also save encrypted data that can be shared
    if (isLoggedIn()) {
      try {
        // Get current encrypted data
        const encryptedEntries = getData();
        // Add the new entry
        const updatedEntries = [...encryptedEntries, entry];
        // Save back to encrypted storage
        saveData(updatedEntries);
        
        // If GitHub Gist is configured, save there too
        if (isConfigured()) {
          try {
            await saveMessagesToGist(updatedEntries);
          } catch (error) {
            console.error('Error saving to GitHub Gist:', error);
            // Still consider successful as we saved locally and with encryption
          }
        }
      } catch (error) {
        console.error('Error saving to encrypted storage:', error);
        // Still return success as we saved locally
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error saving journal entry:', error);
    return false;
  }
};

// Get journal entries (from GitHub Gist, encrypted storage, or localStorage)
export const getJournalEntries = async () => {
  try {
    // If the user is logged in with shared password and GitHub Gist is configured, try to get from GitHub Gist
    if (isLoggedIn() && isConfigured()) {
      try {
        const entries = await getMessagesFromGist();
        // Validate that we received an array
        if (Array.isArray(entries) && entries.length > 0) {
          console.log('Fetched entries from GitHub Gist');
          // Update local encrypted storage to keep it in sync
          saveData(entries);
          // Update localStorage to keep it in sync
          localStorage.setItem(LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
          return entries;
        }
      } catch (error) {
        console.error('Error fetching entries from GitHub Gist:', error);
      }
    }
    
    // If GitHub fetch failed or GitHub is not configured, try encrypted storage
    if (isLoggedIn()) {
      try {
        const entries = getData();
        // Validate that we received an array
        if (Array.isArray(entries)) {
          console.log('Fetched entries from encrypted storage');
          // Update local storage to keep it in sync
          localStorage.setItem(LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
          return entries;
        } else {
          console.error('Encrypted storage returned non-array data:', entries);
        }
      } catch (error) {
        console.error('Error fetching entries from encrypted storage:', error);
      }
    }
    
    // Fallback to localStorage
    return getJournalEntriesFromLocalStorage();
  } catch (error) {
    console.error('Critical error getting journal entries:', error);
    return []; // Always return an array
  }
};

export const getJournalEntriesByLocation = (location) => {
  try {
    const entries = localStorage.getItem(LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES);
    const parsedEntries = entries ? JSON.parse(entries) : [];
    
    // Ensure we're filtering an array
    if (!Array.isArray(parsedEntries)) {
      console.error('Entries is not an array:', parsedEntries);
      return [];
    }
    
    return parsedEntries.filter(entry => entry.location === location);
  } catch (error) {
    console.error('Error filtering entries by location:', error);
    return [];
  }
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
    const parsedCards = cards ? JSON.parse(cards) : [];
    
    // Verify that we have an array
    if (!Array.isArray(parsedCards)) {
      console.error('Parsed language cards is not an array:', parsedCards);
      return [];
    }
    
    return parsedCards;
  } catch (error) {
    console.error('Error getting language cards:', error);
    return [];
  }
};

export const getLanguageCardsByLanguage = (language) => {
  try {
    const cards = getLanguageCards();
    // Ensure cards is an array before filtering
    if (!Array.isArray(cards)) {
      console.error('Language cards is not an array:', cards);
      return [];
    }
    return cards.filter(entry => entry.language === language);
  } catch (error) {
    console.error('Error filtering language cards by language:', error);
    return [];
  }
};

export const setUserLocation = (location) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER_LOCATION, location);
};

export const getUserLocation = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.USER_LOCATION);
};

// Clear all journal entries
export const clearJournalEntries = async () => {
  try {
    // Clear from localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES);
    
    // If logged in, also clear from encrypted storage
    if (isLoggedIn()) {
      try {
        clearData();
        
        // If GitHub Gist is configured, save empty array there too
        if (isConfigured()) {
          try {
            await saveMessagesToGist([]);
          } catch (error) {
            console.error('Error clearing GitHub Gist:', error);
          }
        }
      } catch (error) {
        console.error('Error clearing encrypted data:', error);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error clearing journal entries:', error);
    return false;
  }
}; 