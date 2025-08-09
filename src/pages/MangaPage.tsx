import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, Eye, Calendar, BookOpen } from 'lucide-react';

interface MangaPageProps {
  onNavigate: (page: string) => void;
  onSelectItem: (item: any) => void;
}

const MangaPage: React.FC<MangaPageProps> = ({ onNavigate, onSelectItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 
    'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural'
  ];

  const mangaList = [
    {
      id: 1,
      title: "Jujutsu Kaisen",
      cover: "https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg",
      author: "Gege Akutami",
      genres: ["Action", "Supernatural"],
      status: "Ongoing",
      chapters: 245,
      rating: 9.1,
      views: "2.1M",
      description: "Yuji Itadori, a high school student, joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse named Ryomen Sukuna.",
      lastUpdate: "2 hours ago"
    },
    {
      id: 2,
      title: "Chainsaw Man",
      cover: "https://images.pexels.com/photos/7034784/pexels-photo-7034784.jpeg",
      author: "Tatsuki Fujimoto",
      genres: ["Action", "Horror"],
      status: "Ongoing",
      chapters: 152,
      rating: 8.9,
      views: "1.8M",
      description: "Follow Denji's journey as the Chainsaw Man in this dark urban fantasy.",
      lastUpdate: "5 hours ago"
    },
    {
      id: 3,
      title: "My Hero Academia",
      cover: "https://images.pexels.com/photos/8111264/pexels-photo-8111264.jpeg",
      author: "Kohei Horikoshi",
      genres: ["Action", "School"],
      status: "Completed",
      chapters: 430,
      rating: 8.7,
      views: "1.5M",
      description: "In a world where most humans have superpowers, Izuku Midoriya dreams of becoming a hero.",
      lastUpdate: "1 day ago"
    },
    {
      id: 4,
      title: "One Piece",
      cover: "https://images.pexels.com/photos/8111318/pexels-photo-8111318.jpeg",
      author: "Eiichiro Oda",
      genres: ["Adventure", "Comedy"],
      status: "Ongoing",
      chapters: 1103,
      rating: 9.3,
      views: "3.2M",
      description: "Monkey D. Luffy sets off on an adventure to find the legendary treasure One Piece.",
      lastUpdate: "3 days ago"
    },
    {
      id: 5,
      title: "Attack on Titan",
      cover: "https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg",
      author: "Hajime Isayama",
      genres: ["Action", "Drama"],
      status: "Completed",
      chapters: 139,
      rating: 9.0,
      views: "2.8M",
      description: "Humanity fights for survival against giant humanoid Titans.",
      lastUpdate: "1 week ago"
    },
    {
      id: 6,
      title: "Demon Slayer",
      cover: "https://images.pexels.com/photos/8111116/pexels-photo-8111116.jpeg",
      author: "Koyoharu Gotouge",
      genres: ["Action", "Historical"],
      status: "Completed",
      chapters: 205,
      rating: 8.8,
      views: "2.2M",
      description: "Tanjiro becomes a demon slayer to save his sister and avenge his family.",
      lastUpdate: "2 weeks ago"
    }
  ];

  const filteredManga = mangaList.filter(manga => {
    const matchesSearch = manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         manga.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === '' || manga.genres.includes(selectedGenre);
    const matchesStatus = selectedStatus === '' || manga.status === selectedStatus;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const handleMangaClick = (manga: any) => {
    onSelectItem(manga);
    onNavigate('manga-detail');
  };

  return (
    <div className="min-h-screen bg-dark-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-primary-500" />
            <h1 className="text-3xl font-bold">Manga</h1>
            <span className="text-gray-400">({filteredManga.length} results)</span>
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
                placeholder="Search manga..."
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

        {/* Manga Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredManga.map((manga) => (
              <div
                key={manga.id}
                onClick={() => handleMangaClick(manga)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-dark-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div
                    className="h-80 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${manga.cover})` }}
                  />
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        manga.status === 'Ongoing' ? 'bg-green-500' : 'bg-gray-500'
                      } text-white`}>
                        {manga.status}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{manga.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors line-clamp-2">
                      {manga.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-2">by {manga.author}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {manga.genres.slice(0, 2).map((genre) => (
                        <span key={genre} className="text-xs bg-dark-200 text-gray-300 px-2 py-1 rounded">
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Ch. {manga.chapters}</span>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{manga.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredManga.map((manga) => (
              <div
                key={manga.id}
                onClick={() => handleMangaClick(manga)}
                className="group cursor-pointer bg-dark-300 rounded-xl p-6 hover:bg-dark-200 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="w-24 h-32 bg-cover bg-center rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                    style={{ backgroundImage: `url(${manga.cover})` }}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors mb-1">
                          {manga.title}
                        </h3>
                        <p className="text-gray-400 mb-2">by {manga.author}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{manga.rating}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400">{manga.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {manga.genres.map((genre) => (
                        <span key={genre} className="text-xs bg-dark-200 text-gray-300 px-2 py-1 rounded">
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-300 mb-3 line-clamp-2">
                      {manga.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded-full ${
                          manga.status === 'Ongoing' ? 'bg-green-500' : 'bg-gray-500'
                        } text-white`}>
                          {manga.status}
                        </span>
                        
                        <span className="text-gray-400">
                          Chapter {manga.chapters}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{manga.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredManga.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No manga found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MangaPage;