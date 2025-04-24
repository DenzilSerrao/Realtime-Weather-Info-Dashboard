import React from 'react';
import { CloudSun } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="backdrop-blur-md bg-white/10 rounded-lg shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CloudSun className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">WeatherView</span>
          </div>
          
          {/* <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Maps</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors">About</a>
          </div> */}
          
          <button className="md:hidden text-white hover:text-blue-200 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;