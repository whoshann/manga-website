import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut, Settings, Home, List } from 'lucide-react';

interface MangaReaderProps {
  manga: any;
  onNavigate: (page: string) => void;
}

const MangaReader: React.FC<MangaReaderProps> = ({ manga, onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [showSettings, setShowSettings] = useState(false);

  // Simulate manga pages
  const totalPages = 20;
  const pages = Array.from({ length: totalPages }, (_, i) => ({
    number: i + 1,
    image: `https://images.pexels.com/photos/${8111000 + (i * 100)}/pexels-photo-${8111000 + (i * 100)}.jpeg`
  }));

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      setCurrentPage(totalPages);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentChapter(currentChapter + 1);
      setCurrentPage(1);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-dark-400 border-b border-dark-300 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('manga-detail')}
              className="p-2 text-gray-300 hover:text-white hover:bg-dark-300 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div>
              <h1 className="font-semibold text-white">{manga?.title}</h1>
              <p className="text-sm text-gray-400">Chapter {currentChapter} - Page {currentPage}/{totalPages}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('home')}
              className="p-2 text-gray-300 hover:text-white hover:bg-dark-300 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-300 hover:text-white hover:bg-dark-300 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 p-4 bg-dark-300 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Zoom: {zoom}%</span>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="p-1 text-gray-300 hover:text-white hover:bg-dark-200 rounded"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleResetZoom}
                  className="p-1 text-gray-300 hover:text-white hover:bg-dark-200 rounded"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleZoomIn}
                  className="p-1 text-gray-300 hover:text-white hover:bg-dark-200 rounded"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reader Area */}
      <div className="flex-1 flex items-center justify-center bg-black p-4">
        <div className="relative max-w-4xl w-full">
          {/* Navigation Areas */}
          <button
            onClick={handlePrevPage}
            className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer"
            aria-label="Previous page"
          />
          
          <button
            onClick={handleNextPage}
            className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-pointer"
            aria-label="Next page"
          />
          
          {/* Page Image */}
          <div className="flex justify-center">
            <img
              src={pages[currentPage - 1]?.image}
              alt={`Page ${currentPage}`}
              className="max-w-full h-auto shadow-2xl rounded-lg"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center',
                maxHeight: '90vh'
              }}
            />
          </div>
          
          {/* Page Indicator */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentPage} / {totalPages}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-dark-400 border-t border-dark-300 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1 && currentChapter === 1}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={handleNextPage}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Page Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 text-sm">Go to page:</span>
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="bg-dark-300 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {pages.map((page) => (
                <option key={page.number} value={page.number}>
                  {page.number}
                </option>
              ))}
            </select>
          </div>
          
          {/* Chapter Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 text-sm">Chapter:</span>
            <select
              value={currentChapter}
              onChange={(e) => {
                setCurrentChapter(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-dark-300 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {Array.from({ length: manga?.chapters || 50 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Chapter {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-dark-300 rounded-full h-1">
            <div
              className="bg-primary-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaReader;