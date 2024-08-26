import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center mb-4">
          <div className="w-5 h-5 bg-gray-200 rounded-full mr-3"></div>
          <div className="flex-1 h-6 bg-gray-200 rounded"></div>
          <div className="w-16 h-6 bg-gray-200 rounded ml-2"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
