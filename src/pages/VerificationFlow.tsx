import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopUp } from '../context/TopUpContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

const VerificationFlow: React.FC = () => {
  const navigate = useNavigate();
  const { selectedGame, selectedAmount, setPhoneNumber } = useTopUp();
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [generatedOTP, setGeneratedOTP] = useState<string>('');
  const { t } = useLanguage();


  useEffect(() => {
    if (!selectedGame || !selectedAmount) {
      navigate('/');
    }
  }, [selectedGame, selectedAmount, navigate]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = generateOTP();
    setGeneratedOTP(otp);
    setPhoneNumber(phone);
    setStep('verification');
    alert(t('common.smsSent') + '\n' + t('common.enterVerificationCodeDesc') + '\n' + otp);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === generatedOTP) {
      navigate('/confirmation');
    } else {
      alert(t('common.invalidVerificationCode'));
    }
  };

  const handleBack = () => {
    if (step === 'verification') {
      setStep('phone');
    } else {
      navigate('/amount');
    }
  };

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

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('common.enterPhoneNumber')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('common.enterPhoneNumberDesc')}
                </p>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1234567890"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {t('common.verifyPhone')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('common.enterVerificationCode')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('common.enterVerificationCodeDesc')}
                </p>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {t('common.verifyCode')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationFlow;