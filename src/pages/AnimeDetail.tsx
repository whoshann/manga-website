import React from 'react';
import { Star, Eye, Calendar, Users, Play, Heart, Share, Clock } from 'lucide-react';

interface AnimeDetailProps {
  item: any;
  onNavigate: (page: string) => void;
}

const AnimeDetail: React.FC<AnimeDetailProps> = ({ item, onNavigate }) => {
  if (!item) return <div>Loading...</div>;

  const episodes = Array.from({ length: item.episodes || 12 }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: "24:00",
    releaseDate: new Date(Date.now() - (item.episodes - i) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 500000) + 50000,
    thumbnail: `https://images.pexels.com/photos/${8111000 + i * 50}/pexels-photo-${8111000 + i * 50}.jpeg`
  })).reverse();

  const handleWatchClick = (episode: any) => {
    onNavigate('anime-player');
  };

  return (
    <div className="min-h-screen bg-dark-400">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-400 via-dark-400/80 to-dark-400/40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8 w-full">
            {/* Poster Image */}
            <div className="flex-shrink-0">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-48 h-64 object-cover rounded-xl shadow-2xl border-4 border-dark-300"
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-4">
                {item.genres?.map((genre: string) => (
                  <span key={genre} className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{item.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{item.rating}</span>
                  <span className="text-gray-400">/10</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <span>{item.views} views</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-gray-400" />
                  <span>{item.currentEpisode}/{item.episodes} episodes</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span>{item.studio}</span>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.status === 'Ongoing' ? 'bg-green-500' : 'bg-gray-500'
                } text-white`}>
                  {item.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleWatchClick(episodes[0])}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Now</span>
                </button>
                
                <button className="bg-dark-300 hover:bg-dark-200 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Add to Library</span>
                </button>
                
                <button className="bg-dark-300 hover:bg-dark-200 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                  <Share className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
              <div className="bg-dark-300 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed">
                  {item.description || "An epic anime series with stunning animation and compelling characters. Follow the protagonist's journey through a world filled with adventure, friendship, and incredible battles. Experience emotional storytelling, beautiful art, and music that will leave you wanting more."}
                </p>
              </div>
            </section>

            {/* Episodes List */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Episodes</h2>
                <div className="flex space-x-2">
                  <button className="text-primary-400 hover:text-primary-300 transition-colors">
                    Latest First
                  </button>
                  <span className="text-gray-500">|</span>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    Oldest First
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {episodes.map((episode) => (
                  <div
                    key={episode.number}
                    onClick={() => handleWatchClick(episode)}
                    className="group cursor-pointer bg-dark-300 rounded-xl overflow-hidden hover:bg-dark-200 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="absolute top-2 left-2">
                        <span className="bg-primary-500 text-white px-2 py-1 rounded text-sm font-semibold">
                          EP {episode.number}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{episode.duration}</span>
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-primary-500 rounded-full p-3">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-white group-hover:text-primary-400 transition-colors mb-2">
                        {episode.title}
                      </h4>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{episode.releaseDate}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{(episode.views / 1000).toFixed(0)}K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Information */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Information</h3>
              <div className="bg-dark-300 rounded-xl p-6 space-y-4">
                <div>
                  <dt className="text-gray-400 text-sm">Studio</dt>
                  <dd className="text-white font-semibold">{item.studio}</dd>
                </div>
                
                <div>
                  <dt className="text-gray-400 text-sm">Year</dt>
                  <dd className="text-white font-semibold">{item.year}</dd>
                </div>
                
                <div>
                  <dt className="text-gray-400 text-sm">Status</dt>
                  <dd className="text-white font-semibold">{item.status}</dd>
                </div>
                
                <div>
                  <dt className="text-gray-400 text-sm">Genres</dt>
                  <dd className="flex flex-wrap gap-1 mt-1">
                    {item.genres?.map((genre: string) => (
                      <span key={genre} className="text-xs bg-dark-200 text-gray-300 px-2 py-1 rounded">
                        {genre}
                      </span>
                    ))}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-gray-400 text-sm">Episodes</dt>
                  <dd className="text-white font-semibold">{item.currentEpisode}/{item.episodes}</dd>
                </div>
                
                <div>
                  <dt className="text-gray-400 text-sm">Views</dt>
                  <dd className="text-white font-semibold">{item.views}</dd>
                </div>
                
                <div>
                  <dt className="text-gray-400 text-sm">Rating</dt>
                  <dd className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{item.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({Math.floor(Math.random() * 10000) + 1000} votes)</span>
                  </dd>
                </div>
              </div>
            </section>

            {/* Similar Anime */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Similar Anime</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-dark-300 rounded-xl p-4 hover:bg-dark-200 transition-colors cursor-pointer">
                    <div className="flex space-x-3">
                      <img
                        src={`https://images.pexels.com/photos/${8111000 + i * 200}/pexels-photo-${8111000 + i * 200}.jpeg`}
                        alt={`Similar anime ${i}`}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white mb-1 line-clamp-2">
                          Similar Anime Title {i}
                        </h4>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{(8 + Math.random()).toFixed(1)}</span>
                          
                          <span>•</span>
                          
                          <span>{2020 + i} • 12 eps</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs bg-dark-200 text-gray-300 px-2 py-1 rounded">Action</span>
                          <span className="text-xs bg-dark-200 text-gray-300 px-2 py-1 rounded">Adventure</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;