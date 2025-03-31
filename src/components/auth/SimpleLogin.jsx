import { useState, useEffect } from 'react';
import { isLoggedIn, login, logout } from '../../utils/simpleAuth';
import { translations } from '../../utils/config';

const SimpleLogin = ({ showChineseText, onLoginStateChange }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  
  // Helper function to get translated text
  const t = (key) => {
    return showChineseText ? translations[key].zh : translations[key].en;
  };
  
  useEffect(() => {
    const loginStatus = isLoggedIn();
    setLoggedIn(loginStatus);
    
    if (onLoginStateChange) {
      onLoginStateChange(loginStatus);
    }
  }, [onLoginStateChange]);
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password) {
      const success = login(password);
      setLoggedIn(success);
      setPassword('');
      setShowLoginForm(false);
      
      if (onLoginStateChange) {
        onLoginStateChange(success);
      }
    }
  };
  
  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    
    if (onLoginStateChange) {
      onLoginStateChange(false);
    }
  };
  
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  
  return (
    <div className="relative">
      {loggedIn ? (
        <button
          onClick={handleLogout}
          className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md px-3 py-1 flex items-center"
        >
          <span className="mr-1">🔒</span>
          {t('logout')}
        </button>
      ) : (
        <>
          <button
            onClick={toggleLoginForm}
            className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-md px-3 py-1 flex items-center"
          >
            <span className="mr-1">🔑</span>
            {t('login')}
          </button>
          
          {showLoginForm && (
            <div className="absolute top-full right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 w-64">
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder={t('enterPassword')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 mb-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700"
                >
                  {t('login')}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SimpleLogin; 