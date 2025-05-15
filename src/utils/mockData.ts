import { Game, TopUpOption } from '../types';

export const games: Game[] = [
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    image: 'https://images.pexels.com/photos/1293261/pexels-photo-1293261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'from-red-500 to-red-700'
  },
  {
    id: 'rok',
    name: 'Rise of Kingdoms',
    image: 'https://images.pexels.com/photos/5480787/pexels-photo-5480787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'from-blue-500 to-indigo-700'
  },
  {
    id: 'roblox',
    name: 'Roblox',
    image: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'from-gray-700 to-gray-900'
  }
];

export const topUpOptions: TopUpOption[] = [
  // PUBG Mobile
  {
    id: 'pubg-1',
    gameId: 'pubg',
    amount: '60 UC',
    price: 0.99,
    currency: 'USD'
  },
  {
    id: 'pubg-2',
    gameId: 'pubg',
    amount: '325 UC',
    price: 4.99,
    currency: 'USD'
  },
  {
    id: 'pubg-3',
    gameId: 'pubg',
    amount: '660 UC',
    price: 9.99,
    currency: 'USD'
  },
  {
    id: 'pubg-4',
    gameId: 'pubg',
    amount: '1800 UC',
    price: 24.99,
    currency: 'USD'
  },
  
  // Free Fire
  {
    id: 'freefire-1',
    gameId: 'freefire',
    amount: '100 Diamonds',
    price: 0.99,
    currency: 'USD'
  },
  {
    id: 'freefire-2',
    gameId: 'freefire',
    amount: '310 Diamonds',
    price: 2.99,
    currency: 'USD'
  },
  {
    id: 'freefire-3',
    gameId: 'freefire',
    amount: '520 Diamonds',
    price: 4.99,
    currency: 'USD'
  },
  {
    id: 'freefire-4',
    gameId: 'freefire',
    amount: '1060 Diamonds',
    price: 9.99,
    currency: 'USD'
  },
  
  // Rise of Kingdoms
  {
    id: 'rok-1',
    gameId: 'rok',
    amount: '200 Gems',
    price: 1.99,
    currency: 'USD'
  },
  {
    id: 'rok-2',
    gameId: 'rok',
    amount: '650 Gems',
    price: 4.99,
    currency: 'USD'
  },
  {
    id: 'rok-3',
    gameId: 'rok',
    amount: '1350 Gems',
    price: 9.99,
    currency: 'USD'
  },
  {
    id: 'rok-4',
    gameId: 'rok',
    amount: '2750 Gems',
    price: 19.99,
    currency: 'USD'
  },
  
  // Roblox
  {
    id: 'roblox-1',
    gameId: 'roblox',
    amount: '200 Robux',
    price: 5.33,
    currency: 'USD'
  },
  {
    id: 'roblox-2',
    gameId: 'roblox',
    amount: '400 Robux',
    price: 10.66,
    currency: 'USD'
  },
  {
    id: 'roblox-3',
    gameId: 'roblox',
    amount: '1000 Robux',
    price: 25,
    currency: 'USD'
  },
  {
    id: 'roblox-4',
    gameId: 'roblox',
    amount: '10000 Robux',
    price: 50,
    currency: 'USD'
  }
];