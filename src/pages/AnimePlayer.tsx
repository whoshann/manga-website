import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward, Home, List } from 'lucide-react';

interface AnimePlayerProps {
  anime: any;
  onNavigate: (page: string) => void;
}

const AnimePlayer: React.FC<AnimePlayerProps> = ({ anime, onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(1440); // 24 minutes in seconds
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('1080p');

  // Simulate episodes
  const episodes = Array.from({ length: anime?.episodes || 12 }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: "24:00",
    thumbnail: `https://images.pexels.com/photos/${8111000 + i * 50}/pexels-photo-${8111000 + i * 50}.jpeg`
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value));
  };

  const handlePrevEpisode = () => {
    if (currentEpisode > 1) {
      setCurrentEpisode(currentEpisode - 1);
      setCurrentTime(0);
    }
  };

  const handleNextEpisode = () => {
    if (currentEpisode < episodes.length) {
      setCurrentEpisode(currentEpisode + 1);
      setCurrentTime(0);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="bg-dark-400/90 backdrop-blur-sm border-b border-dark-300/50 px-4 py-3 absolute top-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('anime-detail')}
              className="p-2 text-gray-300 hover:text-white hover:bg-dark-300/50 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
            
            <div>
              <h1 className="font-semibold text-white">{anime?.title}</h1>
              <p className="text-sm text-gray-400">Episode {currentEpisode} of {episodes.length}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="bg-dark-300 text-white px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex h-screen pt-16">
        {/* Video Player */}
        <div className="flex-1 relative bg-black">
          {/* Video Placeholder */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-500 to-dark-600">
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${episodes[currentEpisode - 1]?.thumbnail})` }}
            >
              <div className="absolute inset-0 bg-black/30" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="bg-primary-500 hover:bg-primary-600 rounded-full p-6 transform hover:scale-110 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-white" />
                  ) : (
                    <Play className="w-12 h-12 text-white ml-1" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Video Controls */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePrevEpisode}
                    disabled={currentEpisode === 1}
                    className="p-2 text-white hover:text-primary-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handlePlayPause}
                    className="p-3 bg-primary-500 hover:bg-primary-600 rounded-full transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                  
                  <button
                    onClick={handleNextEpisode}
                    disabled={currentEpisode === episodes.length}
                    className="p-2 text-white hover:text-primary-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleMute}
                      className="p-2 text-white hover:text-primary-400 transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-white hover:text-primary-400 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 text-white hover:text-primary-400 transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Episode Sidebar */}
        <div className="w-80 bg-dark-400 border-l border-dark-300 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Episodes</h3>
            
            <div className="space-y-2">
              {episodes.map((episode) => (
                <div
                  key={episode.number}
                  onClick={() => setCurrentEpisode(episode.number)}
                  className={`group cursor-pointer rounded-lg overflow-hidden transition-all ${
                    currentEpisode === episode.number
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
                      <h4 className={`font-medium text-sm mb-1 ${
                        currentEpisode === episode.number ? 'text-white' : 'text-gray-200'
                      }`}>
                        {episode.title}
                      </h4>
                      
                      <p className={`text-xs ${
                        currentEpisode === episode.number ? 'text-primary-100' : 'text-gray-400'
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

      {/* Auto-hide controls */}
      <div
        className="fixed inset-0 z-10"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      />
    </div>
  );
};

export default AnimePlayer;