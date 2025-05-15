import React, { useState, useEffect } from 'react';
import { useTopUp } from '../context/TopUpContext';
import GameCard from '../components/GameCard';
import { games } from '../utils/mockData';
import { Search } from 'lucide-react';
import { GameCardSkeleton } from '../components/Skeleton';

const GameSelection: React.FC = () => {
  const { dispatch } = useTopUp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectGame = (game: typeof games[0]) => {
    dispatch({ type: 'SELECT_GAME', payload: game });
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold dark:text-white">Choose Your Game</h2>
        <p className="dark:text-gray-300 mt-2">Select a game to purchase a top-up card</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Show skeleton loading state
          Array.from({ length: 8 }).map((_, index) => (
            <GameCardSkeleton key={index} />
          ))
        ) : (
          // Show actual game cards
          filteredGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onSelect={handleSelectGame}
            />
          ))
        )}
      </div>
      
      <div className="mt-16 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold dark:text-white mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-indigo-600 dark:text-indigo-200 font-bold">1</span>
            </div>
            <h4 className="font-bold dark:text-white mb-2">Select a Game</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Choose your game from our available options</p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-indigo-600 dark:text-indigo-200 font-bold">2</span>
            </div>
            <h4 className="font-bold dark:text-white mb-2">Choose Amount</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Select your preferred top-up amount</p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-indigo-600 dark:text-indigo-200 font-bold">3</span>
            </div>
            <h4 className="font-bold dark:text-white mb-2">Get Code</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Verify and receive your digital code instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSelection;