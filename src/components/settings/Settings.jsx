import { useState, useEffect } from 'react';
import { translations } from '../../utils/config';

const Settings = ({ showChineseText, onClose }) => {
  const [weatherApiKey, setWeatherApiKey] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [gistId, setGistId] = useState('');
  const [message, setMessage] = useState('');

  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };

  useEffect(() => {
    // Load saved values from localStorage if they exist
    const savedWeatherKey = localStorage.getItem('user-weather-api-key');
    const savedGithubToken = localStorage.getItem('user-github-token');
    const savedGistId = localStorage.getItem('user-gist-id');
    
    if (savedWeatherKey) setWeatherApiKey(savedWeatherKey);
    if (savedGithubToken) setGithubToken(savedGithubToken);
    if (savedGistId) setGistId(savedGistId);
  }, []);

  const handleSave = () => {
    // Save to localStorage
    if (weatherApiKey) localStorage.setItem('user-weather-api-key', weatherApiKey);
    if (githubToken) localStorage.setItem('user-github-token', githubToken);
    if (gistId) localStorage.setItem('user-gist-id', gistId);
    
    setMessage(t('settingsSaved'));
    
    // The app would need to be modified to check these localStorage values
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{t('settings')}</h2>
        
        {message && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
            {message}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            OpenWeather API Key
          </label>
          <input
            type="text"
            value={weatherApiKey}
            onChange={(e) => setWeatherApiKey(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            placeholder="Your OpenWeather API key"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {t('getApiKey')} <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-500">openweathermap.org</a>
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            GitHub Personal Access Token
          </label>
          <input
            type="password"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            placeholder="Your GitHub token with gist scope"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            GitHub Gist ID
          </label>
          <input
            type="text"
            value={gistId}
            onChange={(e) => setGistId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
            placeholder="ID of your secret gist"
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {t('saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;