import React from 'react';
import { TopUpOption } from '../types';
import { CreditCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TopUpOptionProps {
  option: TopUpOption;
  onSelect: (option: TopUpOption) => void;
  isSelected: boolean;
}

const TopUpOptionCard: React.FC<TopUpOptionProps> = ({ option, onSelect, isSelected }) => {
  const { t, language } = useLanguage();

  return (
    <div 
      className={`relative overflow-hidden border rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
        isSelected 
          ? 'border-indigo-500 bg-indigo-50 shadow-md ring-2 ring-indigo-200 ring-offset-2' 
          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-lg'
      } dark:bg-gray-700`}
      onClick={() => onSelect(option)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`flex items-center ${language === 'ar' ? 'space-x-6' : 'space-x-3'}`}>
          <div className={`p-2 rounded-full ${isSelected ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <CreditCard className={`${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} size={20} />
          </div>
          <span className={`font-medium text-lg ${isSelected ? 'text-indigo-900' : 'text-gray-700'} dark:text-white`}>
            {option.amount}
          </span>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          isSelected 
            ? 'border-indigo-500 bg-indigo-500' 
            : 'border-gray-300'
        }`}>
          {isSelected && (
            <div className="w-2 h-2 bg-white rounded-full"></div>
          )}
        </div>
      </div>
      <div className="mt-2">
        <div className={`text-2xl font-bold ${isSelected ? 'text-indigo-900' : 'text-gray-800'} dark:text-white`}>
          {option.currency} {option.price.toFixed(2)}
        </div>
        <div className={`mt-1 text-sm ${isSelected ? 'text-indigo-600' : 'text-gray-500'} dark:text-white`}>
          {t('common.clickToSelect')}
        </div>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 pulse-ring w-3 h-3 bg-indigo-500 rounded-full"></div>
      )}
    </div>
  );
};

export default TopUpOptionCard;