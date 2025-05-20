import React from 'react';
import { Gamepad2, Moon, Sun } from 'lucide-react';
import { useTopUp } from '../context/TopUpContext';
import { useTheme } from '../features/theme/ThemeProvider';
import { useLanguage } from '../context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'ar' | 'fr')}
      className="bg-transparent text-white border border-white/20 rounded px-2 py-1 text-sm"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
      <option value="fr">Français</option>
    </select>
  );
};

const Header: React.FC = () => {
  const { selectedGame, setSelectedGame, setSelectedAmount } = useTopUp();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      if (confirm('Going back to home will reset your current selection. Continue?')) {
        setSelectedGame(null);
        setSelectedAmount(null);
      }
    }
  };

  const getCurrentStep = () => {
    switch (location.pathname) {
      case '/':
        return 1;
      case '/topup':
        return 2;
      case '/verification':
        return 3;
      case '/confirmation':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = getCurrentStep();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg dark:from-purple-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={handleLogoClick}
        >
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <Gamepad2 size={28} />
            <h1 className="text-xl font-bold">GameFuel</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {location.pathname !== '/' && (
            <div className="hidden sm:flex items-center space-x-1 text-xs md:text-sm">
              <div className={`px-3 py-1 rounded-full ${currentStep >= 1 ? 'bg-white text-indigo-700 font-medium' : 'bg-indigo-800/50'}`}>
                {t('common.selectGame')}
              </div>
              <div className="w-3 h-px bg-white/50"></div>
              <div className={`px-3 py-1 rounded-full ${currentStep >= 2 ? 'bg-white text-indigo-700 font-medium' : 'bg-indigo-800/50'}`}>
                {t('common.chooseAmount')}
              </div>
              <div className="w-3 h-px bg-white/50"></div>
              <div className={`px-3 py-1 rounded-full ${currentStep >= 3 ? 'bg-white text-indigo-700 font-medium' : 'bg-indigo-800/50'}`}>
                {t('common.verify')}
              </div>
              <div className="w-3 h-px bg-white/50"></div>
              <div className={`px-3 py-1 rounded-full ${currentStep >= 4 ? 'bg-white text-indigo-700 font-medium' : 'bg-indigo-800/50'}`}>
                {t('common.complete')}
              </div>
            </div>
          )}
          <LanguageSelector />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;