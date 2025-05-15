import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  );
};

export const GameCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4">
      <Skeleton className="w-full h-32 mb-4 rounded-lg" />
      <Skeleton className="w-3/4 h-6 mb-2" />
      <Skeleton className="w-1/2 h-4" />
    </div>
  );
};

export const TopUpCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4">
      <Skeleton className="w-1/2 h-6 mb-4" />
      <Skeleton className="w-3/4 h-8 mb-2" />
      <Skeleton className="w-1/3 h-4" />
    </div>
  );
};

export const OrderSummarySkeleton: React.FC = () => {
  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 mb-6 border border-indigo-100 dark:border-indigo-800">
      <Skeleton className="w-1/3 h-6 mb-4" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between mb-2">
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/3 h-4" />
        </div>
      ))}
    </div>
  );
};

export const DigitalCodeSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-500">
      <Skeleton className="w-1/3 h-4 mb-4" />
      <Skeleton className="w-full h-8 mb-2" />
    </div>
  );
}; 