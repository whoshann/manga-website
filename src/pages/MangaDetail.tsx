import React from 'react';
import { Star, Eye, Calendar, User, BookOpen, Play, Heart, Share } from 'lucide-react';

interface MangaDetailProps {
  item: any;
  onNavigate: (page: string) => void;
}

const MangaDetail: React.FC<MangaDetailProps> = ({ item, onNavigate }) => {
  if (!item) return <div>Loading...</div>;

  const chapters = Array.from({ length: item.chapters || 50 }, (_, i) => ({
    number: i + 1,
    title: `Chapter ${i + 1}`,
    releaseDate: new Date(Date.now() - (item.chapters - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    views: Math.floor(Math.random() * 100000) + 10000
  })).reverse();

  const handleReadClick = (chapter: any) => {
    onNavigate('manga-reader');
  };

  return (
    <div className="min-h-screen bg-dark-400">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
          style={{ backgroundImage: `url(${item.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-400 via-dark-400/80 to-dark-400/40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8 w-full">
            {/* Cover Image */}
            <div className="flex-shrink-0">
              <img
                src={item.cover}
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
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <span>{item.chapters} chapters</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span>{item.author}</span>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.status === 'Ongoing' ? 'bg-green-500' : 'bg-gray-500'
                } text-white`}>
                  {item.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleReadClick(chapters[0])}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Start Reading</span>
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
                  {item.description || "This is an amazing manga with great storylines and character development. Follow the journey of the protagonist as they face various challenges and grow stronger throughout their adventure. Experience epic battles, emotional moments, and unexpected plot twists that will keep you on the edge of your seat."}
                </p>
              </div>
            </section>

            {/* Chapters List */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Chapters</h2>
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
              
              <div className="bg-dark-300 rounded-xl overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                  {chapters.map((chapter) => (
                    <div
                      key={chapter.number}
                      onClick={() => handleReadClick(chapter)}
                      className="flex items-center justify-between p-4 hover:bg-dark-200 transition-colors cursor-pointer border-b border-dark-200 last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">{chapter.number}</span>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white hover:text-primary-400 transition-colors">
                            {chapter.title}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{chapter.releaseDate}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{chapter.views.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
                    </div>
                  ))}
                </div>
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
                  <dt className="text-gray-400 text-sm">Author</dt>
                  <dd className="text-white font-semibold">{item.author}</dd>
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
                  <dt className="text-gray-400 text-sm">Total Chapters</dt>
                  <dd className="text-white font-semibold">{item.chapters}</dd>
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
                    <span className="text-gray-400 text-sm">({Math.floor(Math.random() * 5000) + 1000} votes)</span>
                  </dd>
                </div>
              </div>
            </section>

            {/* Similar Manga */}
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Similar Manga</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-dark-300 rounded-xl p-4 hover:bg-dark-200 transition-colors cursor-pointer">
                    <div className="flex space-x-3">
                      <img
                        src={`https://images.pexels.com/photos/${8111000 + i * 100}/pexels-photo-${8111000 + i * 100}.jpeg`}
                        alt={`Similar manga ${i}`}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white mb-1 line-clamp-2">
                          Similar Manga Title {i}
                        </h4>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{(8 + Math.random()).toFixed(1)}</span>
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

export default MangaDetail;