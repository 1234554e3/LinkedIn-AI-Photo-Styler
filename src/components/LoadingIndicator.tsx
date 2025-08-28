import React from 'react';

interface LoadingIndicatorProps {
  message: string;
  generatedCount: number;
  totalCount: number;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message, generatedCount, totalCount }) => {
  const progress = totalCount > 0 ? (generatedCount / totalCount) * 100 : 0;

  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-6"></div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">AI is working its magic...</h3>
      <p className="text-slate-600 mb-6">{message}</p>
      <div className="w-full max-w-md bg-slate-200 rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
       <p className="text-sm text-slate-500 mt-2">{generatedCount} of {totalCount} styles generated</p>
    </div>
  );
};

export default LoadingIndicator;
