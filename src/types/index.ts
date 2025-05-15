export interface Game {
  id: string;
  name: string;
  image: string;
  color: string;
}

export interface TopUpOption {
  id: string;
  gameId: string;
  amount: string;
  price: number;
  currency: string;
}

export interface PurchaseState {
  selectedGame: Game | null;
  selectedTopUp: TopUpOption | null;
  msisdn: string;
  otp: string;
  stage: 'game-selection' | 'topup-selection' | 'msisdn-input' | 'otp-verification' | 'processing' | 'confirmation';
  generatedOtp: string;
  digitalCode: string;
}