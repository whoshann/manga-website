import React from 'react';
import { BookOpen, Play } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-dark-400 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <BookOpen className="w-8 h-8 text-primary-500 mr-2 animate-pulse" />
            <Play className="w-6 h-6 text-primary-400 absolute -bottom-1 -right-1 animate-bounce" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent ml-2">
            AniManga Hub
          </h1>
        </div>
        
        <div className="flex space-x-2 justify-center mb-4">
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        <p className="text-gray-400 text-sm">Loading your favorite content...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;