import React, { useState } from 'react';
import { Heart, BookOpen, Play, Filter, Grid, List, Star, Eye } from 'lucide-react';

interface LibraryPageProps {
  onNavigate: (page: string) => void;
  onSelectItem: (item: any) => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ onNavigate, onSelectItem }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('added');

  // Sample library data
  const libraryItems = [
    {
      id: 1,
      type: 'manga',
      title: "Jujutsu Kaisen",
      cover: "https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg",
      progress: 85,
      lastRead: "Chapter 245",
      rating: 9.1,
      status: "Reading",
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      type: 'anime',
      title: "Demon Slayer Season 4",
      cover: "https://images.pexels.com/photos/8111116/pexels-photo-8111116.jpeg",
      progress: 67,
      lastWatched: "Episode 8",
      rating: 9.0,
      status: "Watching",
      addedDate: "2024-01-20"
    },
    {
      id: 3,
      type: 'manga',
      title: "Chainsaw Man",
      cover: "https://images.pexels.com/photos/7034784/pexels-photo-7034784.jpeg",
      progress: 100,
      lastRead: "Chapter 152",
      rating: 8.9,
      status: "Completed",
      addedDate: "2024-01-10"
    },
    {
      id: 4,
      type: 'anime',
      title: "Solo Leveling",
      cover: "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg",
      progress: 100,
      lastWatched: "Episode 12",
      rating: 8.8,
      status: "Completed",
      addedDate: "2024-01-25"
    },
    {
      id: 5,
      type: 'manga',
      title: "My Hero Academia",
      cover: "https://images.pexels.com/photos/8111264/pexels-photo-8111264.jpeg",
      progress: 45,
      lastRead: "Chapter 408",
      rating: 8.7,
      status: "On Hold",
      addedDate: "2024-01-05"
    },
    {
      id: 6,
      type: 'anime',
      title: "Frieren: Beyond Journey's End",
      cover: "https://images.pexels.com/photos/8111089/pexels-photo-8111089.jpeg",
      progress: 60,
      lastWatched: "Episode 16",
      rating: 9.4,
      status: "Watching",
      addedDate: "2024-01-30"
    }
  ];

  const filteredItems = libraryItems.filter(item => {
    switch (activeTab) {
      case 'manga': return item.type === 'manga';
      case 'anime': return item.type === 'anime';
      case 'reading': return item.status === 'Reading' || item.status === 'Watching';
      case 'completed': return item.status === 'Completed';
      default: return true;
    }
  });

  const handleItemClick = (item: any) => {
    onSelectItem(item);
    onNavigate(item.type === 'manga' ? 'manga-detail' : 'anime-detail');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reading':
      case 'Watching':
        return 'bg-green-500';
      case 'Completed':
        return 'bg-blue-500';
      case 'On Hold':
        return 'bg-yellow-500';
      case 'Dropped':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const tabs = [
    { id: 'all', label: 'All', count: libraryItems.length },
    { id: 'manga', label: 'Manga', count: libraryItems.filter(item => item.type === 'manga').length },
    { id: 'anime', label: 'Anime', count: libraryItems.filter(item => item.type === 'anime').length },
    { id: 'reading', label: 'Currently Reading/Watching', count: libraryItems.filter(item => item.status === 'Reading' || item.status === 'Watching').length },
    { id: 'completed', label: 'Completed', count: libraryItems.filter(item => item.status === 'Completed').length }
  ];

  return (
    <div className="min-h-screen bg-dark-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-primary-500" />
            <h1 className="text-3xl font-bold">My Library</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-300 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="added">Recently Added</option>
              <option value="title">Title A-Z</option>
              <option value="progress">Progress</option>
              <option value="rating">Rating</option>
            </select>
            
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
        </div>

        {/* Tabs */}
        <div className="bg-dark-300 rounded-xl p-1 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-dark-200'
                }`}
              >
                <span className="block">{tab.label}</span>
                <span className="text-xs opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Library Content */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Your library is empty</h3>
            <p className="text-gray-500 mb-6">Start adding manga and anime to your favorites!</p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onNavigate('manga')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Browse Manga</span>
              </button>
              
              <button
                onClick={() => onNavigate('anime')}
                className="bg-dark-300 hover:bg-dark-200 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Browse Anime</span>
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-dark-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative">
                    <div
                      className="h-80 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${item.cover})` }}
                    />
                    
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      {item.type === 'anime' ? (
                        <Play className="w-5 h-5 text-white bg-black/50 rounded-full p-1" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-white bg-black/50 rounded-full p-1" />
                      )}
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      
                      <div className="text-xs text-gray-300 text-center">
                        {item.progress}% complete
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                      <span>{item.type === 'manga' ? item.lastRead : item.lastWatched}</span>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Added {new Date(item.addedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="group cursor-pointer bg-dark-300 rounded-xl p-6 hover:bg-dark-200 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-20 h-28 bg-cover bg-center rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                    style={{ backgroundImage: `url(${item.cover})` }}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{item.rating}</span>
                        </div>
                        
                        {item.type === 'anime' ? (
                          <Play className="w-4 h-4 text-primary-400" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-primary-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <span className={`px-3 py-1 text-xs rounded-full text-white ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      
                      <span className="text-gray-400 text-sm">
                        {item.type === 'manga' ? item.lastRead : item.lastWatched}
                      </span>
                      
                      <span className="text-gray-500 text-sm">
                        Added {new Date(item.addedDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      
                      <span className="text-sm text-gray-400 min-w-0">
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;