import React from 'react';
import { Game } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  const { t } = useLanguage();

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up"
      onClick={() => onSelect(game)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-40`}></div>
      <img 
        src={game.image} 
        alt={game.name} 
        className="w-full h-48 object-cover object-center brightness-110" 
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm">
          <h3 className="text-white text-xl font-bold">{game.name}</h3>
          <p className="text-white/90 text-sm mt-1">{t('common.selectForTopUp')}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;