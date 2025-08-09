import React, { useState } from 'react';
import { BookOpen, Play, Search, Menu, X, User, Heart } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'manga', label: 'Manga', icon: BookOpen },
    { id: 'anime', label: 'Anime', icon: Play },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-dark-400/95 backdrop-blur-md border-b border-dark-300 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-primary-500 mr-2 group-hover:text-primary-400 transition-colors" />
              <Play className="w-4 h-4 text-primary-400 absolute ml-4 mt-2" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent ml-2">
              AniManga Hub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-gray-300 hover:text-white hover:bg-dark-300'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search manga, anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-dark-300 text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-dark-200 transition-all"
              />
            </div>
            
            <button
              onClick={() => onNavigate('library')}
              className="p-2 text-gray-300 hover:text-primary-400 hover:bg-dark-300 rounded-lg transition-all"
            >
              <Heart className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => onNavigate('login')}
              className="p-2 text-gray-300 hover:text-primary-400 hover:bg-dark-300 rounded-lg transition-all"
            >
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-left transition-all ${
                    currentPage === item.id
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-gray-300 hover:text-white hover:bg-dark-300'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              ))}
              
              <div className="px-4 py-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-dark-300 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2 px-4">
                <button
                  onClick={() => {
                    onNavigate('library');
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 text-gray-300 hover:text-primary-400 hover:bg-dark-300 rounded-lg transition-all"
                >
                  <Heart className="w-4 h-4" />
                  <span>Library</span>
                </button>
                
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 text-gray-300 hover:text-primary-400 hover:bg-dark-300 rounded-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;