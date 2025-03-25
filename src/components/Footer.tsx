import React from 'react';
import { Download, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white shadow-md py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Download className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-800">SocialSnap</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2">
              <Twitter className="w-5 h-5" />
              <span>Twitter</span>
            </a>
          </div>
          
          <div className="text-gray-500 text-sm">
           <div>AKash Negi</div> © 2024 SocialSnap. All rights reserved.
          <div>blah blah blah</div>
          </div>
        </div>
      </div>
    </footer>
  );
}