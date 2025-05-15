import React, { useState } from 'react';
import { SmartphoneIcon, ArrowRight } from 'lucide-react';

interface MSISDNInputProps {
  onSubmit: (msisdn: string) => void;
  msisdn: string;
  setMsisdn: (msisdn: string) => void;
}

const MSISDNInput: React.FC<MSISDNInputProps> = ({ onSubmit, msisdn, setMsisdn }) => {
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setMsisdn(value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!msisdn) {
      setError('Please enter your mobile number');
      return;
    }
    
    if (msisdn.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    
    onSubmit(msisdn);
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full text-indigo-600 dark:text-indigo-200 mb-4">
          <SmartphoneIcon size={28} />
        </div>
        <h2 className="text-2xl font-bold dark:text-white">Enter your mobile number</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">We'll send a verification code to confirm it's you</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="msisdn" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            id="msisdn"
            value={msisdn}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
            className={`w-full px-4 py-3 rounded-lg border text-gray-900 dark:text-gray-900 ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
            maxLength={15}
          />
          {error && <p className="mt-1 text-sm text-red-600 animate-shake">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center active:scale-95 transform transition-transform duration-150"
        >
          <span>Continue</span>
          <ArrowRight size={18} className="ml-2" />
        </button>
      </form>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        By continuing, you agree to receive a one-time SMS message. Message and data rates may apply.
      </p>
    </div>
  );
};

export default MSISDNInput;