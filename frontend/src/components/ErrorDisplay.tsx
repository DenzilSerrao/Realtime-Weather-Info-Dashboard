import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="backdrop-blur-sm bg-white/20 rounded-lg shadow-lg p-8 flex flex-col items-center">
      <AlertTriangle className="h-16 w-16 text-red-400 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
      <p className="text-white/90 text-center">{message}</p>
      <button className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md">
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;