import React, { useState } from 'react';
import { Play, SkipBack, SkipForward, Home } from 'lucide-react';
import type { Anime } from '../types';

interface AnimePlayerProps {
  anime: Anime;
  onNavigate: (page: string) => void;
}

const AnimePlayer: React.FC<AnimePlayerProps> = ({ anime, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [quality, setQuality] = useState('1080p');

  // Sample video URLs (berbeda untuk setiap episode)
  const videoUrls = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
  ];

  // Simulate episodes
  const episodes = Array.from({ length: anime?.episodes || 12 }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: "24:00",
    thumbnail: i % 2 === 0 ? "/images/dummy-image2.png" : "/images/dummy-image.jpg",
    videoUrl: videoUrls[i % videoUrls.length]
  }));



  const handlePrevEpisode = () => {
    if (currentEpisode > 1) {
      setCurrentEpisode(currentEpisode - 1);
    }
  };

  const handleNextEpisode = () => {
    if (currentEpisode < episodes.length) {
      setCurrentEpisode(currentEpisode + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="bg-dark-400/90 backdrop-blur-sm border-b border-dark-300/50 px-4 py-3 fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
            <button
              onClick={() => onNavigate('anime-detail')}
              className="p-2 text-gray-300 hover:text-white hover:bg-dark-300/50 rounded-lg transition-colors flex-shrink-0"
            >
              <Home className="w-5 h-5" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="font-semibold text-white text-sm md:text-base truncate">{anime?.title}</h1>
              <p className="text-xs md:text-sm text-gray-400">Ep {currentEpisode}/{episodes.length}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="bg-dark-300 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Video Player */}
        <div className="flex-1 relative bg-black flex flex-col">
          {/* HTML5 Video Player */}
          <div className="flex-1 flex items-center justify-center bg-[#1A1A2E]">
            <video
              key={currentEpisode}
              className="w-full h-full"
              controls
              autoPlay={isPlaying}
              muted={isMuted}
              poster={episodes[currentEpisode - 1]?.thumbnail}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={episodes[currentEpisode - 1]?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Episode Navigation */}
          <div className="bg-dark-400 border-t border-dark-300 p-3 md:p-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-2">
              {/* Navigation Buttons */}
              <div className="flex items-center space-x-2 justify-center md:justify-start">
                <button
                  onClick={handlePrevEpisode}
                  disabled={currentEpisode === 1}
                  className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 bg-dark-300 hover:bg-dark-200 disabled:bg-dark-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
                >
                  <SkipBack className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <button
                  onClick={handleNextEpisode}
                  disabled={currentEpisode === episodes.length}
                  className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Episode Info & Selector */}
              <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4">
                {/* Episode Info (Desktop only) */}
                <div className="hidden md:block text-center flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-gray-400">Episode {currentEpisode} of {episodes.length}</p>
                  <p className="text-xs text-gray-500 truncate">{episodes[currentEpisode - 1]?.title}</p>
                </div>

                {/* Episode Selector */}
                <div className="flex items-center space-x-1 md:space-x-2 flex-1 md:flex-initial">
                  <span className="text-gray-300 text-xs md:text-sm whitespace-nowrap">Episode:</span>
                  <select
                    value={currentEpisode}
                    onChange={(e) => setCurrentEpisode(Number(e.target.value))}
                    className="bg-dark-300 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 flex-1 md:flex-initial"
                  >
                    {episodes.map((episode) => (
                      <option key={episode.number} value={episode.number}>
                        {episode.number} - {episode.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Episode Sidebar - Desktop Only */}
        <div className="hidden lg:block lg:w-80 w-full bg-dark-400 lg:border-l border-dark-300 overflow-y-auto" style={{ height: 'calc(100vh - 4rem)' }}>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Episodes</h3>

            <div className="space-y-2">
              {episodes.map((episode) => (
                <div
                  key={episode.number}
                  onClick={() => setCurrentEpisode(episode.number)}
                  className={`group cursor-pointer rounded-lg overflow-hidden transition-all ${currentEpisode === episode.number
                    ? 'bg-primary-500'
                    : 'bg-dark-300 hover:bg-dark-200'
                    }`}
                >
                  <div className="flex items-center space-x-3 p-3">
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-16 h-12 object-cover rounded flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm mb-1 ${currentEpisode === episode.number ? 'text-white' : 'text-gray-200'
                        }`}>
                        {episode.title}
                      </h4>

                      <p className={`text-xs ${currentEpisode === episode.number ? 'text-primary-100' : 'text-gray-400'
                        }`}>
                        {episode.duration}
                      </p>
                    </div>

                    {currentEpisode === episode.number && (
                      <Play className="w-4 h-4 text-white flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default AnimePlayer;