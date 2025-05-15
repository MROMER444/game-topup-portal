import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Game, TopUpOption, PurchaseState } from '../types';
import { generateOTP, generateDigitalCode } from '../utils/simulations';

// Initial state
const initialState: PurchaseState = {
  selectedGame: null,
  selectedTopUp: null,
  msisdn: '',
  otp: '',
  stage: 'game-selection',
  generatedOtp: '',
  digitalCode: ''
};

// Action types
type Action = 
  | { type: 'SELECT_GAME'; payload: Game }
  | { type: 'SELECT_TOPUP'; payload: TopUpOption }
  | { type: 'SET_MSISDN'; payload: string }
  | { type: 'GENERATE_OTP' }
  | { type: 'SET_OTP'; payload: string }
  | { type: 'SET_STAGE'; payload: PurchaseState['stage'] }
  | { type: 'GENERATE_DIGITAL_CODE' }
  | { type: 'RESET' };

// Reducer
const reducer = (state: PurchaseState, action: Action): PurchaseState => {
  switch (action.type) {
    case 'SELECT_GAME':
      return { 
        ...state, 
        selectedGame: action.payload, 
        stage: 'topup-selection',
        selectedTopUp: null
      };
    case 'SELECT_TOPUP':
      return { 
        ...state, 
        selectedTopUp: action.payload, 
        stage: 'msisdn-input' 
      };
    case 'SET_MSISDN':
      return { ...state, msisdn: action.payload };
    case 'GENERATE_OTP':
      return { 
        ...state, 
        generatedOtp: generateOTP(),
        stage: 'otp-verification'
      };
    case 'SET_OTP':
      return { ...state, otp: action.payload };
    case 'SET_STAGE':
      return { ...state, stage: action.payload };
    case 'GENERATE_DIGITAL_CODE':
      return { 
        ...state, 
        digitalCode: generateDigitalCode(),
        stage: 'confirmation'
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

// Create context
type TopUpContextType = {
  state: PurchaseState;
  dispatch: React.Dispatch<Action>;
};

const TopUpContext = createContext<TopUpContextType | undefined>(undefined);

// Provider component
export const TopUpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TopUpContext.Provider value={{ state, dispatch }}>
      {children}
    </TopUpContext.Provider>
  );
};

// Custom hook to use the context
export const useTopUp = (): TopUpContextType => {
  const context = useContext(TopUpContext);
  if (!context) {
    throw new Error('useTopUp must be used within a TopUpProvider');
  }
  return context;
};