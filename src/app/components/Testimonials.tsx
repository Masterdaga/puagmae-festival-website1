"use client";
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Music Enthusiast",
    image: "/testimonial-1.jpg",
    content: "The Puagmae Festival was absolutely incredible! The energy, the music, and the cultural diversity made it an unforgettable experience. Can't wait for next year!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Cultural Artist",
    image: "/testimonial-2.jpg",
    content: "As an artist, I was blown away by the creativity and passion at this festival. The workshops and performances were world-class. Truly inspiring!",
    rating: 5
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Festival Goer",
    image: "/testimonial-3.jpg",
    content: "This was my first time at Puagmae and I'm already planning for next year! The community spirit and amazing performances created memories I'll cherish forever.",
    rating: 5
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Photographer",
    image: "/testimonial-4.jpg",
    content: "The visual spectacle and cultural richness of this festival is unmatched. Every moment was picture-perfect. A photographer's dream!",
    rating: 5
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "Dance Instructor",
    image: "/testimonial-5.jpg",
    content: "The dance workshops and performances were absolutely phenomenal. The energy was electric and the cultural exchange was beautiful to witness.",
    rating: 5
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Event Organizer",
    image: "/testimonial-6.jpg",
    content: "From an organizer's perspective, this festival was flawlessly executed. The attention to detail and cultural authenticity was remarkable.",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black/50 to-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            What People Say
          </h2>
          <p className="text-xl text-yellow-100/70 max-w-3xl mx-auto">
            Hear from festival-goers, artists, and cultural enthusiasts about their 
            unforgettable experiences at Puagmae Street Festival
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group relative bg-yellow-900/5 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 ${
                index === activeIndex ? 'ring-2 ring-yellow-400/50' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-yellow-100/90 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-black font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold">{testimonial.name}</h4>
                    <p className="text-yellow-200/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-yellow-400 scale-125'
                  : 'bg-yellow-400/30 hover:bg-yellow-400/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-yellow-900/20 border border-yellow-400/30 rounded-full text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 bg-yellow-900/20 border border-yellow-400/30 rounded-full text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-yellow-100/80 mb-6 text-lg">
            Join thousands of satisfied festival-goers and create your own memories
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105">
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  );
} 