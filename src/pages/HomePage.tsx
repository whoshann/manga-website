import React from 'react';
import { BookOpen, Play, Star, Eye, TrendingUp } from 'lucide-react';
import type { Manga, Anime } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectItem: (item: Manga | Anime) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectItem }) => {
  const featuredContent = {
    title: "Attack on Titan: Final Season",
    description: "The final battle for humanity's survival reaches its climax. Follow Eren Yeager and the Survey Corps as they face the ultimate truth about their world.",
    image: "/images/attack-on-titan-final-season-final-episode.jpg",
    type: "anime",
    rating: 9.2,
    episodes: 16
  };

  const latestManga = [
    {
      id: 1,
      title: "Jujutsu Kaisen",
      cover: "/images/jujutsu-kaisen.jpg",
      genres: ["Action", "Supernatural"],
      status: "Ongoing",
      chapter: "Chapter 245",
      rating: 9.1,
      views: "2.1M"
    },
    {
      id: 2,
      title: "Chainsaw Man",
      cover: "/images/chainsaw-man.jpg",
      genres: ["Action", "Horror"],
      status: "Ongoing",
      chapter: "Chapter 152",
      rating: 8.9,
      views: "1.8M"
    },
    {
      id: 3,
      title: "My Hero Academia",
      cover: "/images/my-hero-academia.jpg",
      genres: ["Action", "School"],
      status: "Ongoing",
      chapter: "Chapter 408",
      rating: 8.7,
      views: "1.5M"
    },
    {
      id: 4,
      title: "One Piece",
      cover: "/images/one-piece.jpg",
      genres: ["Adventure", "Comedy"],
      status: "Ongoing",
      chapter: "Chapter 1103",
      rating: 9.3,
      views: "3.2M"
    }
  ];

  const latestAnime = [
    {
      id: 1,
      title: "Demon Slayer Season 4",
      thumbnail: "/images/demon-slayer.jpg",
      genres: ["Action", "Historical"],
      episode: "Episode 8",
      rating: 9.0,
      views: "1.9M"
    },
    {
      id: 2,
      title: "Frieren: Beyond Journey's End",
      thumbnail: "/images/frieren.jpg",
      genres: ["Fantasy", "Drama"],
      episode: "Episode 16",
      rating: 9.4,
      views: "2.3M"
    },
    {
      id: 3,
      title: "Solo Leveling",
      thumbnail: "/images/solo-leveling.png",
      genres: ["Action", "Fantasy"],
      episode: "Episode 12",
      rating: 8.8,
      views: "2.1M"
    },
    {
      id: 4,
      title: "Wind Breaker",
      thumbnail: "/images/wind-breaker.jpg",
      genres: ["Action", "School"],
      episode: "Episode 10",
      rating: 8.6,
      views: "1.4M"
    }
  ];

  const handleItemClick = (item: Manga | Anime, type: string) => {
    onSelectItem({ ...item, type });
    onNavigate(type === 'manga' ? 'manga-detail' : 'anime-detail');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-dark-500 to-dark-400 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${featuredContent.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-500/90 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl animate-slide-up">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-primary-500 text-white text-sm rounded-full">Featured</span>
              <span className="px-3 py-1 bg-dark-300 text-gray-300 text-sm rounded-full">Anime</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {featuredContent.title}
            </h1>
            
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {featuredContent.description}
            </p>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{featuredContent.rating}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">{featuredContent.episodes} Episodes</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onNavigate('manga')}
                className="flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                <span>Mulai Baca</span>
              </button>
              
              <button
                onClick={() => onNavigate('anime')}
                className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-dark-400 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                <Play className="w-5 h-5" />
                <span>Mulai Nonton</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Manga Section */}
      <section className="py-16 bg-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-primary-500" />
              <h2 className="lg:text-3xl text-xl font-bold">Manga Terbaru</h2>
            </div>
            
            <button
              onClick={() => onNavigate('manga')}
              className="text-primary-400 lg:text-lg text-sm hover:text-primary-300 font-semibold transition-colors"
            >
              Lihat Semua →
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestManga.map((manga) => (
              <div
                key={manga.id}
                onClick={() => handleItemClick(manga, 'manga')}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative bg-dark-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div
                    className="h-80 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${manga.cover})` }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-400/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      manga.status === 'Ongoing' ? 'bg-green-500' : 'bg-gray-500'
                    } text-white`}>
                      {manga.status}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-500 to-transparent">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {manga.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {manga.genres.map((genre) => (
                        <span key={genre} className="text-xs bg-dark-200/50 text-gray-300 px-2 py-1 rounded">
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300">{manga.rating}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">{manga.views}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm text-primary-400">
                      {manga.chapter}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Anime Section */}
      <section className="py-16 bg-dark-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Play className="w-6 h-6 text-primary-500" />
              <h2 className="text-3xl font-bold">Anime Terbaru</h2>
            </div>
            
            <button
              onClick={() => onNavigate('anime')}
              className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
            >
              Lihat Semua →
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestAnime.map((anime) => (
              <div
                key={anime.id}
                onClick={() => handleItemClick(anime, 'anime')}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative bg-dark-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div
                    className="h-80 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${anime.thumbnail})` }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-400/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs">
                      <Play className="w-3 h-3 inline mr-1" />
                      NEW
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-500 to-transparent">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {anime.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {anime.genres.map((genre) => (
                        <span key={genre} className="text-xs bg-dark-200/50 text-gray-300 px-2 py-1 rounded">
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300">{anime.rating}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">{anime.views}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-sm text-primary-400">
                      {anime.episode}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bergabung dengan Jutaan Pembaca & Penonton
          </h2>
          
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Akses ribuan manga dan anime terbaru. Gratis dan tanpa batas!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => onNavigate('login')}
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Daftar Sekarang
            </button>
            
            <button
              onClick={() => onNavigate('manga')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Jelajahi Konten
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;