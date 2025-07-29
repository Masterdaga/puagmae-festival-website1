"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const [showGalleryDropdown, setShowGalleryDropdown] = useState(false);
  const [showAboutUsDropdown, setShowAboutUsDropdown] = useState(false);

  

  // Function to close all other dropdowns
  const closeOtherDropdowns = (currentDropdown: string) => {
    if (currentDropdown !== 'about') setShowAboutUsDropdown(false);
    if (currentDropdown !== 'media') setShowMediaDropdown(false);
    if (currentDropdown !== 'gallery') setShowGalleryDropdown(false);
  };

  // Function to handle dropdown toggle
  const toggleDropdown = (dropdownName: string) => {
    closeOtherDropdowns(dropdownName);
    
    switch (dropdownName) {
      case 'about':
        setShowAboutUsDropdown(!showAboutUsDropdown);
        break;
      case 'media':
        setShowMediaDropdown(!showMediaDropdown);
        break;
      case 'gallery':
        setShowGalleryDropdown(!showGalleryDropdown);
        break;
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-gradient-to-r from-red-900 via-orange-800 to-yellow-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Menu Button - LEFT */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
            >
              <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="font-semibold">MENU</span>
            </button>

            {/* Festival Name - CENTER */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                PUAGMAE 2025
              </h1>
              <p className="text-white text-sm tracking-widest">FESTIVAL</p>
            </div>

            {/* TICKETS Button - RIGHT */}
            <button className="bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
              <span className="font-semibold">TICKETS</span>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay - Only Navigation Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {/* Navigation Bar Only */}
        <div className="bg-blue-900 border-b border-blue-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Close Button - LEFT */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">CLOSE</span>
              </button>

              {/* Festival Info - CENTER */}
              <div className="text-center text-white">
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-sm">17-24 JULY 2025</span>
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z"/>
                  </svg>
                  <span className="text-sm">NEW MOON</span>
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z"/>
                  </svg>
                </div>
                <div className="mt-2">
                  <h1 className="text-3xl font-bold">PUAGMAE 2025 FESTIVAL</h1>
                </div>
                <div className="flex items-center justify-center space-x-4 mt-2">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z"/>
                  </svg>
                  <span className="text-sm">ADWA MUSEUM - ETHIOPIA</span>
                </div>
              </div>

              {/* Empty space - RIGHT */}
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        {/* Navigation Links Bar */}
        <div className="bg-blue-800 border-b border-teal-400">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-8 text-white text-sm">
              {/* About Us with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('about')}
                  className="flex items-center space-x-1 hover:text-teal-300 transition-colors"
                >
                  <span>ABOUT US</span>
                  <span className={`text-lg font-bold transition-all duration-300 ${showAboutUsDropdown ? 'text-orange-400 scale-110' : 'text-teal-300'}`}>
                    {showAboutUsDropdown ? '⌃' : '⌄'}
                  </span>
                </button>

                {/* About Us Dropdown Menu */}
                {showAboutUsDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-blue-700 rounded-lg shadow-lg py-2 px-4 animate-fade-in min-w-48">
                    <Link
                      href="/about"
                      className="block text-yellow-300 hover:text-yellow-400 transition-colors py-2 px-3 rounded hover:bg-blue-600"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowAboutUsDropdown(false);
                      }}
                    >
                      WHO WE ARE
                    </Link>
                    <Link
                      href="/vision"
                      className="block text-yellow-300 hover:text-yellow-400 transition-colors py-2 px-3 rounded hover:bg-blue-600"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowAboutUsDropdown(false);
                      }}
                    >
                      VISION
                    </Link>
                  </div>
                )}
              </div>

              {/* Media with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('media')}
                  className="flex items-center space-x-1 hover:text-teal-300 transition-colors"
                >
                  <span>MEDIA</span>
                  <span className={`text-lg font-bold transition-all duration-300 ${showMediaDropdown ? 'text-orange-400 scale-110' : 'text-teal-300'}`}>
                    {showMediaDropdown ? '⌃' : '⌄'}
                  </span>
                </button>

                {/* Media Dropdown Menu */}
                {showMediaDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-blue-700 rounded-lg shadow-lg py-2 px-4 animate-fade-in min-w-48">
                    <Link
                      href="/videos"
                      className="block text-yellow-300 hover:text-yellow-400 transition-colors py-2 px-3 rounded hover:bg-blue-600"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowMediaDropdown(false);
                      }}
                    >
                      VIDEOS
                    </Link>
                  </div>
                )}
              </div>

              {/* Gallery with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('gallery')}
                  className="flex items-center space-x-1 hover:text-teal-300 transition-colors"
                >
                  <span>GALLERY</span>
                  <span className={`text-lg font-bold transition-all duration-300 ${showGalleryDropdown ? 'text-orange-400 scale-110' : 'text-teal-300'}`}>
                    {showGalleryDropdown ? '⌃' : '⌄'}
                  </span>
                </button>

                {/* Gallery Dropdown Menu */}
                {showGalleryDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-blue-700 rounded-lg shadow-lg py-2 px-4 animate-fade-in min-w-48">
                    <Link
                      href="/photos"
                      className="block text-yellow-300 hover:text-yellow-400 transition-colors py-2 px-3 rounded hover:bg-blue-600"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowGalleryDropdown(false);
                      }}
                    >
                      PHOTOS
                    </Link>
                    <Link
                      href="/artwork"
                      className="block text-yellow-300 hover:text-yellow-400 transition-colors py-2 px-3 rounded hover:bg-blue-600"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowGalleryDropdown(false);
                      }}
                    >
                      ARTWORK
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/schedule" className="hover:text-teal-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
                <span>SCHEDULE</span>
              </Link>
              <Link href="/testimonials" className="hover:text-teal-300 transition-colors">
                <span>TESTIMONIALS</span>
              </Link>
              <Link href="/news" className="hover:text-teal-300 transition-colors">
                <span>NEWS</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Teal line under navigation */}
        <div className="h-1 bg-teal-400"></div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
} 