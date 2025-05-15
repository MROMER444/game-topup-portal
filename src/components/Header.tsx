import React from 'react';
import { Gamepad2, Moon, Sun } from 'lucide-react';
import { useTopUp } from '../context/TopUpContext';
import { useTheme } from '../features/theme/ThemeProvider';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { state, dispatch } = useTopUp();
  const { theme, toggleTheme } = useTheme();

  const handleLogoClick = () => {
    if (state.stage !== 'game-selection') {
      if (confirm('Going back to home will reset your current selection. Continue?')) {
        dispatch({ type: 'RESET' });
      }
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg dark:from-purple-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={handleLogoClick}
        >
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <Gamepad2 size={28} />
            <h1 className="text-xl font-bold">GameTopUp</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {state.stage !== 'game-selection' && (
            <div className="hidden sm:flex items-center space-x-1 text-xs md:text-sm">
              <div className={`px-3 py-1 rounded-full bg-indigo-800/50`}>
                Select Game
              </div>
              <div className="w-3 h-px bg-white/50"></div>
              <div className={`px-3 py-1 rounded-full ${state.stage === 'topup-selection' ? 'bg-white text-indigo-700 font-medium' : 'bg-indigo-800/50'}`}>
                Choose Amount
              </div>
              <div className="w-3 h-px bg-white/50"></div>
              <div className={`px-3 py-1 rounded-full ${['msisdn-input', 'otp-verification'].includes(state.stage) ? 'bg-white text-indigo-700 font-medium' : 'bg-indigo-800/50'}`}>
                Verify
              </div>
              <div className="w-3 h-px bg-white/50"></div>
              <div className={`px-3 py-1 rounded-full ${['processing', 'confirmation'].includes(state.stage) ? 'bg-white text-indigo-700 font-medium' : 'bg-indigo-800/50'}`}>
                Complete
              </div>
            </div>
          )}
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