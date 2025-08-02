"use client";
import { useState } from 'react';
import Link from 'next/link';

const landingSlides = [
  {
    id: 1,
    title: 'PUAGMAE FESTIVAL',
    subtitle: 'Experience the Magic'
  }
];

export default function LandingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Stylish Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-yellow-900 to-yellow-700" />

      {/* Optional: Add a subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/30 via-transparent to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center z-40">
        <div className="text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-wider drop-shadow-lg">
            {landingSlides[currentIndex].title}
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 mb-8">
            {landingSlides[currentIndex].subtitle}
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/about"
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300"
            >
              LEARN MORE
            </Link>
            <Link 
              href="/tickets"
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-600 transition-all duration-300"
            >
              GET TICKETS
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-3">
          {landingSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled
            />
          ))}
        </div>
      </div>
    </div>
  );
}