"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const landingImages = [
  {
    id: 1,
    src: '/entoto.jpg',
    alt: 'Entoto Festival Scene',
    title: 'PUAGMAE STREET FESTIVAL',
    subtitle: 'Experience the Magic'
  }
];

export default function LandingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % landingImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % landingImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + landingImages.length) % landingImages.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {landingImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          
          {/* Dark overlay for better text readability - removed for logo */}
          {image.id !== 1 && <div className="absolute inset-0 bg-black/40"></div>}
        </div>
      ))}



      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center z-40">
        <div className="text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-wider">
            {landingImages[currentIndex].title}
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 mb-8">
            {landingImages[currentIndex].subtitle}
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
          {landingImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Bottom Right */}
      <div className="absolute bottom-8 right-8 z-50">
        <div className="flex space-x-3">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-black/30 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-black/30 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>


    </div>
  );
} 