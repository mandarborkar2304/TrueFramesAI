import React from 'react';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-purple-600" />
            <span className="ml-2 text-gray-900 font-medium">TrueFrame</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TrueFrame. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}