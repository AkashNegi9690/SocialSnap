import React from 'react';
import { Download } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Download className="w-8 h-8 text-fuchsia-600" />
            <span className="text-xl font-bold text-gray-800">SocialSnap</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">About</a>
            <button 
              onClick={onContactClick}
              className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 
                transition-all duration-300 shadow-md"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}