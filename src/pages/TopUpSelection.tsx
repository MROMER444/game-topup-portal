import React, { useState, useEffect } from 'react';
import { useTopUp } from '../context/TopUpContext';
import TopUpOption from '../components/TopUpOption';
import { topUpOptions } from '../utils/mockData';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TopUpCardSkeleton } from '../components/Skeleton';

const TopUpSelection: React.FC = () => {
  const { state, dispatch } = useTopUp();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);
  
  if (!state.selectedGame) return null;
  
  const gameTopUpOptions = topUpOptions.filter(
    option => option.gameId === state.selectedGame?.id
  );
  
  const handleBack = () => {
    dispatch({ type: 'SET_STAGE', payload: 'game-selection' });
  };
  
  const handleSelectTopUp = (option: typeof topUpOptions[0]) => {
    setSelectedOption(option.id);
    dispatch({ type: 'SELECT_TOPUP', payload: option });
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-8">
        <button 
          onClick={handleBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="text-center mb-8">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${state.selectedGame.color}`}>
          <img 
            src={state.selectedGame.image} 
            alt={state.selectedGame.name} 
            className="w-full h-full object-cover rounded-full" 
          />
        </div>
        <h2 className="text-3xl font-bold dark:text-white">Choose Your Amount</h2>
        <p className="text-black dark:text-white mt-2">Select your preferred top-up amount</p>
      </div>
      
      <div className="max-w-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoading ? (
            // Show skeleton loading state
            Array.from({ length: 4 }).map((_, index) => (
              <TopUpCardSkeleton key={index} />
            ))
          ) : (
            // Show actual top-up options
            gameTopUpOptions.map(option => (
              <TopUpOption
                key={option.id}
                option={option}
                onSelect={handleSelectTopUp}
                isSelected={selectedOption === option.id}
              />
            ))
          )}
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex justify-between items-center">
            <p className="text-black dark:text-white text-sm">
              Prices include all applicable taxes
            </p>
            {selectedOption && !isLoading && (
              <button 
                onClick={() => {
                  const option = gameTopUpOptions.find(o => o.id === selectedOption);
                  if (option) {
                    dispatch({ type: 'SELECT_TOPUP', payload: option });
                  }
                }}
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpSelection;