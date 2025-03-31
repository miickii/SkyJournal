import CryptoJS from 'crypto-js'; 

// Local storage keys
const AUTH_KEY = 'skyjournal-auth-token';
const DATA_KEY = 'skyjournal-encrypted-data';

// Default shared password (you should change this in production)
const DEFAULT_PASSWORD = 'skyjournal2024';

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getAuthToken();
};

// Get the auth token from local storage
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_KEY);
};

// Save the auth token
export const saveAuthToken = (token) => {
  localStorage.setItem(AUTH_KEY, token);
};

// Login with password
export const login = (password) => {
  if (!password) return false;
  
  // Save the password as the auth token
  saveAuthToken(password);
  return true;
};

// Logout
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

// Get data with decryption
export const getData = () => {
  try {
    const password = getAuthToken() || DEFAULT_PASSWORD;
    const encryptedData = localStorage.getItem(DATA_KEY);
    
    if (!encryptedData) return [];
    
    // Decrypt the data
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, password);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedText) return [];
    
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return [];
  }
};

// Save data with encryption
export const saveData = (data) => {
  try {
    const password = getAuthToken() || DEFAULT_PASSWORD;
    
    // Encrypt the data
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data), 
      password
    ).toString();
    
    localStorage.setItem(DATA_KEY, encryptedData);
    return true;
  } catch (error) {
    console.error('Error encrypting data:', error);
    return false;
  }
};

// Clear all data
export const clearData = () => {
  localStorage.removeItem(DATA_KEY);
  return true;
}; 