// GitHub Gist configuration
const GIST_DESCRIPTION = 'SkyJournal Messages Storage';
const STORAGE_GIST_FILENAME = 'sky-journal-messages.json';

// Replace these with your own values
// 1. Create a GitHub Personal Access Token with 'gist' scope at https://github.com/settings/tokens
// 2. Create an empty secret Gist at https://gist.github.com/ and copy its ID from the URL
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || 'YOUR_PERSONAL_ACCESS_TOKEN';
const GIST_ID = import.meta.env.VITE_GIST_ID || 'YOUR_GIST_ID';

// Import CryptoJS for encryption
import CryptoJS from 'crypto-js';
import { isLoggedIn as isSimpleLoggedIn, getAuthToken as getSimpleAuthToken } from './simpleAuth';

// Check if GitHub integration is configured properly
export const isConfigured = () => {
  return GITHUB_TOKEN !== 'YOUR_PERSONAL_ACCESS_TOKEN' && 
         GIST_ID !== 'YOUR_GIST_ID';
};

// Fetch the Gist
export const fetchGist = async () => {
  if (!isConfigured()) {
    console.warn('GitHub Gist is not configured.');
    return null;
  }
  
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Gist: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Gist:', error);
    return null;
  }
};

// Update the Gist with new content
export const updateGist = async (content) => {
  if (!isConfigured()) {
    console.warn('GitHub Gist is not configured.');
    return false;
  }
  
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: {
          [STORAGE_GIST_FILENAME]: {
            content: JSON.stringify(content)
          }
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update Gist: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating Gist:', error);
    return false;
  }
};

// Get messages from Gist storage with decryption
export const getMessagesFromGist = async () => {
  try {
    // Only proceed if configured
    if (!isConfigured()) {
      console.warn('GitHub Gist is not configured. Using local storage only.');
      return [];
    }
    
    // Only fetch if we have a shared password to decrypt with
    if (!isSimpleLoggedIn()) {
      console.warn('Cannot decrypt Gist data: No shared password set');
      return [];
    }
    
    const gist = await fetchGist();
    if (gist && gist.files && gist.files[STORAGE_GIST_FILENAME]) {
      const encryptedContent = gist.files[STORAGE_GIST_FILENAME].content;
      
      // Parse the content (expecting encrypted JSON string)
      try {
        const parsedContent = JSON.parse(encryptedContent);
        
        // Get the shared password for decryption
        const password = getSimpleAuthToken();
        
        // Decrypt the data
        const decryptedBytes = CryptoJS.AES.decrypt(parsedContent.data, password);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedText) {
          console.error('Failed to decrypt Gist data - wrong password?');
          return [];
        }
        
        const decryptedData = JSON.parse(decryptedText);
        
        // Always ensure we return an array
        if (!Array.isArray(decryptedData)) {
          console.error('Decrypted data is not an array:', decryptedData);
          return [];
        }
        
        console.log('Successfully fetched and decrypted data from GitHub Gist');
        return decryptedData;
      } catch (error) {
        console.error('Error parsing or decrypting Gist content:', error);
        return [];
      }
    }
    return [];
  } catch (error) {
    console.error('Error getting messages from Gist:', error);
    return [];
  }
};

// Save messages to Gist storage with encryption
export const saveMessagesToGist = async (messages) => {
  try {
    // Only proceed if configured
    if (!isConfigured()) {
      console.warn('GitHub Gist is not configured. Saving to local storage only.');
      return false;
    }
    
    // Only save if we have a shared password to encrypt with
    if (!isSimpleLoggedIn()) {
      console.warn('Cannot encrypt Gist data: No shared password set');
      return false;
    }
    
    // Get the shared password for encryption
    const password = getSimpleAuthToken();
    
    // Encrypt the messages
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(messages), 
      password
    ).toString();
    
    // Package the encrypted data
    const packagedData = {
      data: encryptedData,
      timestamp: new Date().toISOString()
    };
    
    // Save to Gist
    const updated = await updateGist(packagedData);
    if (updated) {
      console.log('Successfully encrypted and saved data to GitHub Gist');
    }
    return updated;
  } catch (error) {
    console.error('Error saving messages to Gist:', error);
    return false;
  }
}; 