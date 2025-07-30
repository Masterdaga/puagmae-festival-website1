"use client";
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-black via-gray-900 to-black py-32 px-4 flex flex-col items-center justify-center overflow-hidden min-h-screen">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Event badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-900/20 backdrop-blur-md border border-yellow-400/30 rounded-full px-6 py-3 mb-8 animate-fade-in">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className="text-yellow-200 text-sm font-medium">Live Event</span>
        </div>

        {/* Main headline */}
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
            Puagmae
          </span>
          <br />
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
            Festival
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-yellow-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience the ultimate celebration of culture, music, and community. 
          Join thousands of festival-goers for an unforgettable experience.
        </p>

        {/* Date and location */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="flex items-center gap-3 text-yellow-200">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-yellow-300/60">Date & Time</div>
              <div className="font-semibold">September 10, 2024 • 4:00 PM</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-yellow-200">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-yellow-300/60">Location</div>
              <div className="font-semibold">Adwa Museum, Ethiopia</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10">Get Tickets Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
          </button>
          
          <button className="px-8 py-4 border-2 border-yellow-400/30 text-yellow-200 font-semibold rounded-full text-lg hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm">
            Watch Trailer
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">50+</div>
            <div className="text-yellow-200/70 text-sm">Artists</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">3 Days</div>
            <div className="text-yellow-200/70 text-sm">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">10K+</div>
            <div className="text-yellow-200/70 text-sm">Attendees</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
} 