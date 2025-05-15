import React, { useEffect, useState } from 'react';
import { BadgeCheck, Copy, RefreshCcw } from 'lucide-react';
import { useTopUp } from '../context/TopUpContext';

interface ConfirmationScreenProps {
  digitalCode: string;
  onReset: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ digitalCode, onReset }) => {
  const { state } = useTopUp();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(digitalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format digital code for display (add spaces for readability)
  const formattedCode = digitalCode.split('-').join(' ');

  // Add confetti effect
  useEffect(() => {
    const confetti = () => {
      // This would be implemented with a confetti library
      console.log('Confetti effect!');
    };
    
    confetti();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-800 rounded-full text-green-600 dark:text-green-200 mb-4">
          <BadgeCheck size={42} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Purchase Successful!</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Your {state.selectedGame?.name} top-up code has been generated
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-500">
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Your digital code:</p>
        <div className="flex items-center justify-between">
          <div className="text-lg font-mono font-bold text-gray-800 dark:text-white tracking-wide break-all">
            {formattedCode}
          </div>
          <button 
            onClick={handleCopyCode}
            className="ml-2 p-2 text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-full transition-colors"
          >
            {copied ? <BadgeCheck size={20} className="text-green-500" /> : <Copy size={20} />}
          </button>
        </div>
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 mb-6 border border-indigo-100 dark:border-indigo-800">
        <h3 className="font-bold text-indigo-800 dark:text-indigo-200 mb-2">Order Summary</h3>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-white">Game:</span>
          <span className="font-medium text-gray-900 dark:text-white">{state.selectedGame?.name}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-white">Amount:</span>
          <span className="font-medium text-gray-900 dark:text-white">{state.selectedTopUp?.amount}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-white">Price:</span>
          <span className="font-medium text-gray-900 dark:text-white">{state.selectedTopUp?.currency} {state.selectedTopUp?.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-white">Phone:</span>
          <span className="font-medium text-gray-900 dark:text-white">+{state.msisdn}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
        A copy of this code has been sent to your phone via SMS
      </p>
      
      <button
        onClick={onReset}
        className="w-full bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 py-3 px-4 rounded-lg font-medium hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors flex items-center justify-center"
      >
        <RefreshCcw size={18} className="mr-2" />
        <span>Purchase Another Top-Up</span>
      </button>
    </div>
  );
};

export default ConfirmationScreen;