import React from 'react';
import { Home, Info, Shield, LogIn, LogOut } from 'lucide-react';

type HeaderProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
  currentPage: 'home' | 'about' | 'detect';
  setCurrentPage: (page: 'home' | 'about' | 'detect') => void;
};

export function Header({ isAuthenticated, onLogout, currentPage, setCurrentPage }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TrueFrame</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'home'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </button>
            
            <button
              onClick={() => setCurrentPage('about')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'about'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Info className="h-4 w-4 mr-1" />
              About
            </button>
            
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}