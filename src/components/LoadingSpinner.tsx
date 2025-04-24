import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="backdrop-blur-sm bg-white/20 rounded-lg shadow-lg p-12 flex flex-col items-center justify-center">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-blue-400 border-b-blue-400 border-l-transparent border-r-transparent spin"></div>
        <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-4 border-t-transparent border-b-transparent border-l-white border-r-white spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <p className="text-white text-xl mt-6">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;