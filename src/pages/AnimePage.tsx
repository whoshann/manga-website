import React, { useState } from 'react';
import { Search, Grid, List, Star, Eye, Calendar, Play } from 'lucide-react';
import type { Anime } from '../types';

interface AnimePageProps {
  onNavigate: (page: string) => void;
  onSelectItem: (item: Anime) => void;
}

const AnimePage: React.FC<AnimePageProps> = ({ onNavigate, onSelectItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 
    'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'
  ];

  const animeList = [
    {
      id: 1,
      title: "Demon Slayer Season 4",
      thumbnail: "/images/demon-slayer.jpg",
      studio: "Ufotable",
      genres: ["Action", "Historical"],
      status: "Ongoing",
      episodes: 12,
      currentEpisode: 8,
      rating: 9.0,
      views: "1.9M",
      description: "Tanjiro and his friends continue their battle against demons in the Hashira Training Arc.",
      lastUpdate: "1 day ago",
      year: 2024
    },
    {
      id: 2,
      title: "Frieren: Beyond Journey's End",
      thumbnail: "/images/frieren.jpg",
      studio: "Madhouse",
      genres: ["Fantasy", "Drama"],
      status: "Ongoing",
      episodes: 28,
      currentEpisode: 16,
      rating: 9.4,
      views: "2.3M",
      description: "An elf mage's journey to understand humanity and the passage of time.",
      lastUpdate: "3 days ago",
      year: 2023
    },
    {
      id: 3,
      title: "Solo Leveling",
      thumbnail: "/images/solo-leveling.png",
      studio: "A-1 Pictures",
      genres: ["Action", "Fantasy"],
      status: "Completed",
      episodes: 12,
      currentEpisode: 12,
      rating: 8.8,
      views: "2.1M",
      description: "Sung Jin-Woo becomes the world's strongest hunter in this action-packed series.",
      lastUpdate: "1 week ago",
      year: 2024
    },
    {
      id: 4,
      title: "Wind Breaker",
      thumbnail: "/images/wind-breaker.jpg",
      studio: "CloverWorks",
      genres: ["Action", "School"],
      status: "Ongoing",
      episodes: 13,
      currentEpisode: 10,
      rating: 8.6,
      views: "1.4M",
      description: "High school delinquents protect their town in this action-packed series.",
      lastUpdate: "2 days ago",
      year: 2024
    },
    {
      id: 5,
      title: "Attack on Titan: Final Season",
      thumbnail: "/images/attack-on-titan-final-season-final-episode.jpg",
      studio: "WIT Studio / MAPPA",
      genres: ["Action", "Drama"],
      status: "Completed",
      episodes: 16,
      currentEpisode: 16,
      rating: 9.2,
      views: "3.5M",
      description: "The epic conclusion to humanity's fight against the Titans.",
      lastUpdate: "2 months ago",
      year: 2023
    },
    {
      id: 6,
      title: "Jujutsu Kaisen Season 2",
      thumbnail: "/images/jujutsu-kaisen.jpg",
      studio: "MAPPA",
      genres: ["Action", "Supernatural"],
      status: "Completed",
      episodes: 23,
      currentEpisode: 23,
      rating: 9.1,
      views: "2.8M",
      description: "The Shibuya Incident arc brings intense battles and shocking revelations.",
      lastUpdate: "3 months ago",
      year: 2023
    }
  ];

  const filteredAnime = animeList.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         anime.studio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === '' || anime.genres.includes(selectedGenre);
    const matchesStatus = selectedStatus === '' || anime.status === selectedStatus;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const handleAnimeClick = (anime: Anime) => {
    onSelectItem(anime);
    onNavigate('anime-detail');
  };

  return (
    <div className="min-h-screen bg-dark-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Play className="w-8 h-8 text-primary-500" />
            <h1 className="lg:text-3xl text-2xl font-bold">Anime</h1>
            <span className="text-gray-400">({filteredAnime.length} results)</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-dark-300 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-dark-200 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-dark-200 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-dark-200 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-200 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="latest">Latest Update</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rating</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        {/* Anime Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnime.map((anime) => (
              <div
                key={anime.id}
                onClick={() => handleAnimeClick(anime)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-dark-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative">
                    <div
                      className="h-80 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${anime.thumbnail})` }}
                    />
                    
                    <div className="absolute top-4 right-4">
                      <div className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                        <Play className="w-3 h-3" />
                        <span>EP {anime.currentEpisode}</span>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-500/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition-colors">
                        Watch Now
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        anime.status === 'Ongoing' ? 'bg-green-500' : 'bg-gray-500'
                      } text-white`}>
                        {anime.status}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{anime.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors line-clamp-2">
                      {anime.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-2">{anime.studio} • {anime.year}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {anime.genres.slice(0, 2).map((genre) => (
                        <span key={genre} className="text-xs bg-dark-200 text-gray-300 px-2 py-1 rounded">
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{anime.currentEpisode}/{anime.episodes} eps</span>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{anime.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnime.map((anime) => (
              <div
                key={anime.id}
                onClick={() => handleAnimeClick(anime)}
                className="group cursor-pointer bg-dark-300 rounded-xl p-6 hover:bg-dark-200 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-24 h-32 bg-cover bg-center rounded-lg group-hover:scale-105 transition-transform"
                      style={{ backgroundImage: `url(${anime.thumbnail})` }}
                    />
                    
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs">
                        EP {anime.currentEpisode}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors mb-1">
                          {anime.title}
                        </h3>
                        <p className="text-gray-400 mb-2">{anime.studio} • {anime.year}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{anime.rating}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400">{anime.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {anime.genres.map((genre) => (
                        <span key={genre} className="text-xs bg-dark-200 text-gray-300 px-2 py-1 rounded">
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-300 mb-3 line-clamp-2">
                      {anime.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-2 py-1 rounded-full ${
                          anime.status === 'Ongoing' ? 'bg-green-500' : 'bg-gray-500'
                        } text-white`}>
                          {anime.status}
                        </span>
                        
                        <span className="text-gray-400">
                          {anime.currentEpisode}/{anime.episodes} Episodes
                        </span>
                        
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{anime.lastUpdate}</span>
                        </div>
                      </div>
                      
                      <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Watch</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredAnime.length === 0 && (
          <div className="text-center py-16">
            <Play className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No anime found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimePage;