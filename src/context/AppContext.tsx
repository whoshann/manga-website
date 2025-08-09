import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface LibraryItem {
  id: string;
  type: 'manga' | 'anime';
  title: string;
  cover: string;
  progress: number;
  status: string;
  addedDate: string;
}

interface AppContextType {
  user: User | null;
  library: LibraryItem[];
  setUser: (user: User | null) => void;
  addToLibrary: (item: LibraryItem) => void;
  removeFromLibrary: (id: string) => void;
  updateLibraryItem: (id: string, updates: Partial<LibraryItem>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [library, setLibrary] = useState<LibraryItem[]>([]);

  const addToLibrary = (item: LibraryItem) => {
    setLibrary(prev => [...prev.filter(libItem => libItem.id !== item.id), item]);
  };

  const removeFromLibrary = (id: string) => {
    setLibrary(prev => prev.filter(item => item.id !== id));
  };

  const updateLibraryItem = (id: string, updates: Partial<LibraryItem>) => {
    setLibrary(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const value: AppContextType = {
    user,
    library,
    setUser,
    addToLibrary,
    removeFromLibrary,
    updateLibraryItem,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};