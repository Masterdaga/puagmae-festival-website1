"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [showMap, setShowMap] = useState(false);
  const [isMapPermanent, setIsMapPermanent] = useState(false);

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 w-full overflow-x-hidden backdrop-blur-md">
      {/* Newsletter Section */}
      
<div className="bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 backdrop-blur-sm py-8 px-4 border-t border-yellow-400/20">
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-4">
      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent mb-3 tracking-wide drop-shadow-lg">
        LET'S STAY IN TOUCH
      </h2>
      <p className="text-yellow-200/90 text-lg">
        Be the first to know about updates and festival announcements.
      </p>
    </div>

    {/* Email Input Section */}
    <div className="max-w-lg mx-auto">
      <div className="flex gap-3">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-1 bg-black/40 backdrop-blur-sm border-2 border-yellow-400/30 text-yellow-200 placeholder-yellow-300/60 px-5 py-4 rounded-full focus:outline-none focus:border-yellow-400 transition-colors text-lg"
        />
        <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-4 rounded-full font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
          <span>Subscribe</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-yellow-200/70 text-center mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  </div>
</div>

      {/* Main Footer Content */}
      <div className="bg-black/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {/* Quick Links */}
             <div className="text-yellow-200">
               <h3 className="text-xl font-bold mb-4 text-yellow-400 border-b border-yellow-400/30 pb-2">Quick Links</h3>
               <div className="space-y-2">
                 <ul className="space-y-2">
                   <li><Link href="/about" className="hover:text-yellow-300 transition-colors flex items-center">
                     <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                     About
                   </Link></li>
                   <li><Link href="/schedule" className="hover:text-yellow-300 transition-colors flex items-center">
                     <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                     Schedule
                   </Link></li>
                   <li><Link href="/gallery" className="hover:text-yellow-300 transition-colors flex items-center">
                     <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                     Gallery
                   </Link></li>
                   <li><Link href="/testimonials" className="hover:text-yellow-300 transition-colors flex items-center">
                     <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                     Testimonials
                   </Link></li>
                 </ul>
               </div>
             </div>

            {/* Social Media */}
            <div className="text-yellow-200">
              <h3 className="text-xl font-bold mb-4 text-yellow-400 border-b border-yellow-400/30 pb-2">Connect With Us</h3>
              <div className="space-y-3">
                <a href="https://facebook.com/puagmaefestival" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-yellow-300 transition-colors group">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span>Facebook</span>
                </a>
                <a href="https://instagram.com/puagmaefestival" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-yellow-300 transition-colors group">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span>Instagram</span>
                </a>
                <a href="https://tiktok.com/@puagmaefestival" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-yellow-300 transition-colors group">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-700 to-yellow-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </div>
                  <span>TikTok</span>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-yellow-200">
              <h3 className="text-xl font-bold mb-4 text-yellow-400 border-b border-yellow-400/30 pb-2">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div className="text-sm">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=puagmaef@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">puagmaef@gmail.com</a>
                    <br />
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pjafrica.2020@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">pjafrica.2020@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <a href="tel:+251911234567" className="text-sm hover:text-yellow-300 transition-colors">+251 911 234 567</a>
                </div>
                <div className="relative">
                  <div 
                    className="flex items-start cursor-pointer hover:text-yellow-300 transition-colors"
                    onClick={() => {
                      setIsMapPermanent(true);
                      setShowMap(true);
                    }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-700 to-yellow-800 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-sm">Ledeta Kefleketema, Kebele 49, At last floor of Haven Hotel</span>
                  </div>
                </div>
              </div>
              
              {/* Contact Us Button - Enhanced pill-shaped design */}
              <div className="mt-6">
                <Link 
                  href="/contact" 
                  className="block w-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black px-6 py-2 rounded-full border-2 border-yellow-300/30 hover:border-yellow-300/60 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl text-center group"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold mb-0.5 tracking-wider uppercase">GET IN TOUCH</div>
                    <div className="text-sm font-semibold">Contact us</div>
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-black/80 backdrop-blur-md border-t border-yellow-400/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-yellow-200/80 text-xs">
            <div className="mb-2 md:mb-0">
              © 2025 Puagmae Festival. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="hover:text-yellow-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-yellow-300 transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-yellow-300 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Golden accent line */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>

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
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-4 flex items-center justify-between">
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