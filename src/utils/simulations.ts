/**
 * Generates a random OTP code
 */
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Simulates checking if user has sufficient balance
 */
export const checkBalance = (msisdn: string, amount: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a 90% chance of having sufficient balance
      const hasSufficientBalance = Math.random() < 0.9;
      resolve(hasSufficientBalance);
    }, 1500);
  });
};

/**
 * Simulates charging the user account
 */
export const chargeAccount = (msisdn: string, amount: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a 95% chance of successful charge
      const isSuccessful = Math.random() < 0.95;
      resolve(isSuccessful);
    }, 2000);
  });
};

/**
 * Generates a digital code for the top-up
 */
export const generateDigitalCode = (): string => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) result += '-';
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Simulates sending an SMS with the digital code
 */
export const sendSMS = (msisdn: string, code: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a 98% chance of successful SMS delivery
      const isSuccessful = Math.random() < 0.98;
      resolve(isSuccessful);
    }, 1000);
  });
};