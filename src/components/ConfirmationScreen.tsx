import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopUp } from '../context/TopUpContext';
import { useLanguage } from '../context/LanguageContext';
import { Copy, CheckCircle2, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

const ConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedGame, selectedAmount, phoneNumber, digitalCode, generateDigitalCode } = useTopUp();
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useLanguage();

  // Generate digital code when component mounts
  useEffect(() => {
    if (!digitalCode) {
      generateDigitalCode();
    }
  }, [digitalCode, generateDigitalCode]);

  const handleCopyCode = async () => {
    if (digitalCode) {
      try {
        // Try the modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(digitalCode);
        } else {
          // Fallback for non-secure contexts
          const textArea = document.createElement('textarea');
          textArea.value = digitalCode;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            document.execCommand('copy');
          } catch (err) {
            console.error('Failed to copy text: ', err);
          }
          
          document.body.removeChild(textArea);
        }
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  // Trigger confetti effect when component mounts
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // If no game or amount is selected, redirect to home
  useEffect(() => {
    if (!selectedGame || !selectedAmount) {
      navigate('/');
    }
  }, [selectedGame, selectedAmount, navigate]);

  if (!selectedGame || !selectedAmount) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('common.back')}
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('common.purchaseSuccessful')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('common.codeGenerated', { game: selectedGame.name || '' })}
        </p>
      </div>
      
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {t('common.orderSummary')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t('common.game')}</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedGame.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t('common.amount')}</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedAmount.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t('common.price')}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedAmount.currency} {selectedAmount.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{t('common.phone')}</span>
                <span className="font-medium text-gray-900 dark:text-white">{phoneNumber || '-'}</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {t('common.digitalCode')}
            </h3>
            <div 
            onClick={handleCopyCode}
              className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
              <span className="font-mono text-lg text-gray-900 dark:text-white">{digitalCode || '-'}</span>
              <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                {isCopied ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
          </button>
        </div>
            {isCopied && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                {t('common.codeCopied')}
              </p>
            )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;