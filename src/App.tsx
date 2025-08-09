import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MangaPage from './pages/MangaPage';
import AnimePage from './pages/AnimePage';
import MangaDetail from './pages/MangaDetail';
import AnimeDetail from './pages/AnimeDetail';
import MangaReader from './pages/MangaReader';
import AnimePlayer from './pages/AnimePlayer';
import LoginPage from './pages/LoginPage';
import LibraryPage from './pages/LibraryPage';
import { AppProvider } from './context/AppContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onSelectItem={setSelectedItem} />;
      case 'manga':
        return <MangaPage onNavigate={setCurrentPage} onSelectItem={setSelectedItem} />;
      case 'anime':
        return <AnimePage onNavigate={setCurrentPage} onSelectItem={setSelectedItem} />;
      case 'manga-detail':
        return <MangaDetail item={selectedItem} onNavigate={setCurrentPage} />;
      case 'anime-detail':
        return <AnimeDetail item={selectedItem} onNavigate={setCurrentPage} />;
      case 'manga-reader':
        return <MangaReader manga={selectedItem} onNavigate={setCurrentPage} />;
      case 'anime-player':
        return <AnimePlayer anime={selectedItem} onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'library':
        return <LibraryPage onNavigate={setCurrentPage} onSelectItem={setSelectedItem} />;
      default:
        return <HomePage onNavigate={setCurrentPage} onSelectItem={setSelectedItem} />;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-dark-400 text-white">
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="pt-16">
          {renderPage()}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;