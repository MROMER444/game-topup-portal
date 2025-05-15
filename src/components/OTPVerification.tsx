import React, { useState, useEffect, useRef } from 'react';
import { KeyRound, ArrowRight } from 'lucide-react';

interface OTPVerificationProps {
  onVerify: (otp: string) => void;
  msisdn: string;
  generatedOtp: string;
  otp: string;
  setOtp: (otp: string) => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  onVerify, 
  msisdn, 
  generatedOtp, 
  otp, 
  setOtp 
}) => {
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);
  
  const handleResendOTP = () => {
    setTimeLeft(30);
    // In a real app, we would call an API to resend the OTP
    console.log('Resending OTP to', msisdn);
    alert(`Debug: Your OTP is ${generatedOtp}`);
  };
  
  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Create a new otp string
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));
    setError('');
    
    // Move to next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const clearOTPAndFocus = () => {
    setOtp('');
    setError('Invalid verification code. Please try again.');
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setError('Please enter the 6-digit code');
      setOtp('');
      inputRefs.current[0]?.focus();
      return;
    }
    
    // Check if OTP matches
    if (otp !== generatedOtp) {
      clearOTPAndFocus();
      return;
    }
    
    onVerify(otp);
  };
  
  // For demo purposes, log the OTP
  useEffect(() => {
    alert(`Debug: Your OTP is ${generatedOtp}`);
  }, [generatedOtp]);
  
  // Format phone number
  const formatPhone = (phone: string) => {
    if (phone.length <= 4) return phone;
    return `${phone.slice(0, 4)}-${phone.slice(4)}`;
  };
  
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full text-indigo-600 dark:text-indigo-200 mb-4">
          <KeyRound size={28} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Verification Code</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Enter the code sent to <span className="font-medium">{formatPhone(msisdn)}</span>
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between gap-2">
            {[0, 1, 2, 3, 4, 5].map(index => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={otp[index] || ''}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-xl font-bold border rounded-lg text-gray-900 dark:text-gray-900 ${
                  error ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              />
            ))}
          </div>
          {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <span>Verify</span>
          <ArrowRight size={18} className="ml-2" />
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Didn't receive the code?
        </p>
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={timeLeft > 0}
          className={`mt-1 text-sm font-medium ${
            timeLeft > 0 ? 'text-gray-400 dark:text-gray-500' : 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300'
          }`}
        >
          {timeLeft > 0 ? `Resend code in ${timeLeft}s` : 'Resend code'}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;