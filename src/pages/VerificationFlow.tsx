import React, { useState, useEffect } from 'react';
import { useTopUp } from '../context/TopUpContext';
import MSISDNInput from '../components/MSISDNInput';
import OTPVerification from '../components/OTPVerification';
import ProcessingScreen from '../components/ProcessingScreen';
import ConfirmationScreen from '../components/ConfirmationScreen';
import { checkBalance, chargeAccount, sendSMS } from '../utils/simulations';
import { ArrowLeft } from 'lucide-react';

const VerificationFlow: React.FC = () => {
  const { state, dispatch } = useTopUp();
  const [processingMessage, setProcessingMessage] = useState('Checking balance...');
  
  const handleMsisdnSubmit = (msisdn: string) => {
    dispatch({ type: 'SET_MSISDN', payload: msisdn });
    dispatch({ type: 'GENERATE_OTP' });
  };
  
  const handleBack = () => {
    if (state.stage === 'msisdn-input') {
      dispatch({ type: 'SET_STAGE', payload: 'topup-selection' });
    } else if (state.stage === 'otp-verification') {
      dispatch({ type: 'SET_STAGE', payload: 'msisdn-input' });
    }
  };
  
  const handleOtpVerify = async (otp: string) => {
    // In a real app, we would call an API to verify the OTP
    // For this demo, we'll just check if the OTP matches
    if (otp !== state.generatedOtp) {
      alert('Invalid OTP. Please try again.');
      return;
    }
    
    dispatch({ type: 'SET_STAGE', payload: 'processing' });
    
    // Simulate balance check
    setProcessingMessage('Checking balance...');
    const hasBalance = await checkBalance(state.msisdn, state.selectedTopUp?.price || 0);
    
    if (!hasBalance) {
      alert('Insufficient balance. Please try again with a different payment method.');
      dispatch({ type: 'SET_STAGE', payload: 'msisdn-input' });
      return;
    }
    
    // Simulate charging account
    setProcessingMessage('Processing payment...');
    const isCharged = await chargeAccount(state.msisdn, state.selectedTopUp?.price || 0);
    
    if (!isCharged) {
      alert('Payment failed. Please try again.');
      dispatch({ type: 'SET_STAGE', payload: 'msisdn-input' });
      return;
    }
    
    // Generate digital code
    dispatch({ type: 'GENERATE_DIGITAL_CODE' });
    
    // Simulate sending SMS
    await sendSMS(state.msisdn, state.digitalCode);
  };
  
  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };
  
  // Helper to set MSISDN in the context
  const handleSetMsisdn = (msisdn: string) => {
    dispatch({ type: 'SET_MSISDN', payload: msisdn });
  };
  
  // Helper to set OTP in the context
  const handleSetOtp = (otp: string) => {
    dispatch({ type: 'SET_OTP', payload: otp });
  };
  
  useEffect(() => {
    // Scroll to top when stage changes
    window.scrollTo(0, 0);
  }, [state.stage]);
  
  return (
    <div className="container mx-auto px-4 py-6">
      {state.stage !== 'confirmation' && state.stage !== 'processing' && (
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back</span>
          </button>
        </div>
      )}
      
      {state.stage === 'msisdn-input' && (
        <MSISDNInput 
          onSubmit={handleMsisdnSubmit} 
          msisdn={state.msisdn} 
          setMsisdn={handleSetMsisdn}
        />
      )}
      
      {state.stage === 'otp-verification' && (
        <OTPVerification 
          onVerify={handleOtpVerify} 
          msisdn={state.msisdn} 
          generatedOtp={state.generatedOtp}
          otp={state.otp}
          setOtp={handleSetOtp}
        />
      )}
      
      {state.stage === 'processing' && (
        <ProcessingScreen message={processingMessage} />
      )}
      
      {state.stage === 'confirmation' && (
        <ConfirmationScreen 
          digitalCode={state.digitalCode} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
};

export default VerificationFlow;