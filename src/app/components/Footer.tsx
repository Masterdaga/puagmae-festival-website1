"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [showMap, setShowMap] = useState(false);
  const [isMapPermanent, setIsMapPermanent] = useState(false);

  return (
    <footer className="bg-blue-900 border-t border-blue-700">
      {/* Newsletter Signup Section */}
      <div className="bg-gradient-to-r from-purple-900 via-blue-800 to-orange-800 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Side - Text */}
            <div className="text-white mb-8 md:mb-0">
              <p className="text-sm opacity-80 mb-2">Sign up for Puagmae Newsletter</p>
              <h2 className="text-4xl md:text-5xl font-bold" style={{fontFamily: 'cursive, serif'}}>
                LET'S STAY IN TOUCH
              </h2>
            </div>

            {/* Right Side - Email Input */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-b-2 border-white text-white placeholder-gray-300 px-2 py-2 w-64 focus:outline-none focus:border-orange-400"
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></div>
              </div>
              <button className="text-white hover:text-orange-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Content Grid */}
      <div className="bg-blue-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Quick Links</h3>
              <div className="space-y-2">
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
                  <li><Link href="/media" className="hover:text-orange-400 transition-colors">Media</Link></li>
                  <li><Link href="/gallery" className="hover:text-orange-400 transition-colors">Gallery</Link></li>
                  <li><Link href="/schedule" className="hover:text-orange-400 transition-colors">Schedule</Link></li>
                  <li><Link href="/testimonials" className="hover:text-orange-400 transition-colors">Testimonials</Link></li>
                  <li><Link href="/news" className="hover:text-orange-400 transition-colors">News</Link></li>
                </ul>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Social Media</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center space-x-3 hover:text-orange-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                                 <a href="#" className="flex items-center space-x-3 hover:text-orange-400 transition-colors">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                   </svg>
                   <span>Instagram</span>
                 </a>
                <a href="#" className="flex items-center space-x-3 hover:text-orange-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  <span>TikTok</span>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-white">
              {/* Contact Us Button */}
              <div className="mb-6">
                <Link 
                  href="/contact" 
                  className="inline-block bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-6 py-3 rounded-md border border-gray-600 hover:border-gray-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-sm font-semibold mb-1 tracking-wide">GET IN TOUCH</div>
                    <div className="text-lg font-medium">Contact us</div>
                  </div>
                </Link>
              </div>
  
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-orange-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                                           <span className="text-lg">
                           <a href="https://mail.google.com/mail/?view=cm&fs=1&to=puagmaef@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">puagmaef@gmail.com</a>
                           <span className="mx-2">or</span>
                           <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pjafrica.2020@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">pjafrica.2020@gmail.com</a>
                         </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span className="text-lg">+251 911 234 567</span>
                </div>
                                  <div className="relative">
                    <div 
                      className="flex items-start cursor-pointer hover:text-orange-400 transition-colors"
                      onClick={() => {
                        setIsMapPermanent(true);
                        setShowMap(true);
                      }}
                    >
                       <svg className="w-5 h-5 text-orange-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                       </svg>
                       <span className="text-lg">Ledeta Kefleketema, Kebele 49, At last floor of Haven Hotel</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teal line at bottom */}
      <div className="h-1 bg-teal-400"></div>

      {/* Full Screen Map Modal */}
      {showMap && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onMouseEnter={() => {
            if (!isMapPermanent) {
              // Keep map open when hovering over it
            }
          }}
          onMouseLeave={() => {
            if (!isMapPermanent) {
              setShowMap(false);
            }
          }}
        >
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowMap(false);
              setIsMapPermanent(false);
            }}
          ></div>
          
          {/* Map Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                                     {/* Header with controls */}
            <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">📍 Our Office Location</h3>
              <div className="flex items-center space-x-2">
                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowMap(false);
                    setIsMapPermanent(false);
                  }}
                  className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-white font-bold text-lg">×</span>
                </button>
              </div>
            </div>
            
            {/* Map */}
            <div className="w-[600px] h-[400px] transition-all duration-300">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.527726980457!2d38.73319197455684!3d9.015529089200626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b86759211d999%3A0x74668c1e1413be93!2zSGF2ZW4gSG90ZWwgfCBHZWphIFNlZmVyIHwg4YiA4Ymo4YqVIOGIhuGJtOGIjSB8IOGMjOGMgyDhiLDhjYjhiK0!5e0!3m2!1sen!2set!4v1723378908230!5m2!1sen!2set" 
                className="w-full h-full" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
} 