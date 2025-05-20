import React, { createContext, useContext, useState } from 'react';
import { Game, TopUpOption } from '../types';

interface TopUpContextType {
  selectedGame: Game | null;
  setSelectedGame: (game: Game | null) => void;
  selectedAmount: TopUpOption | null;
  setSelectedAmount: (amount: TopUpOption | null) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  digitalCode: string;
  generateDigitalCode: () => void;
  }

const TopUpContext = createContext<TopUpContextType | undefined>(undefined);

export const TopUpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<TopUpOption | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [digitalCode, setDigitalCode] = useState('');

  const generateDigitalCode = () => {
    const code = Math.random().toString(36).substring(2, 15).toUpperCase();
    setDigitalCode(code);
  };

  return (
    <TopUpContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
        selectedAmount,
        setSelectedAmount,
        phoneNumber,
        setPhoneNumber,
        verificationCode,
        setVerificationCode,
        digitalCode,
        generateDigitalCode,
      }}
    >
      {children}
    </TopUpContext.Provider>
  );
};

export const useTopUp = () => {
  const context = useContext(TopUpContext);
  if (context === undefined) {
    throw new Error('useTopUp must be used within a TopUpProvider');
  }
  return context;
};