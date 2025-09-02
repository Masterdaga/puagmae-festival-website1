'use client';
import React, { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

const testimonials = [
  {
    quote:
      "Attending the Puagmae Festival was an unforgettable experience! The vibrant celebration of culture, tradition, and community left a lasting impression on me. The organizers did an amazing job of bringing together people from all walks of life to celebrate our shared heritage. I can't wait to attend next year!",
    name: 'Loret Sileshi Demissie',
    title: 'Artist',
    image: '/testimonials/gashabera.png',
  },
  {
    quote:
      "The Puagmae Festival is a true celebration of African culture. The energy, the colors, the music—everything was beautifully organized and truly represented the rich diversity of our continent. It's more than just an event; it's a moment of unity and pride. I felt deeply connected to my roots and to the community around me.",
    name: 'Dr. Getnet Feleke',
    title: 'Astronomical Doctor',
    image: '/testimonials/getnet.jpg',
  },
  {
    quote:
      'The Puagmae Festival was a remarkable showcase of our cultural heritage. From the traditional performances to the workshops and exhibitions, every aspect of the festival was thoughtfully curated. It was a joy to see the younger generation engage with our traditions in such a meaningful way. Kudos to the organizers for putting together such an inspiring event!',
    name: 'Ashenafi Kidane',
    title: 'Ethio Adams Agro Industry Manager',
    image: '/testimonials/ashenafi.jpg',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const previous = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const next = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative min-h-screen py-20 pb-28 px-4 overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/new-adeyababa.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3b2f23] to-black opacity-80 -z-10" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-300 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-yellow-400 mb-12">
          Hear from Our Guests
        </h1>
        <div className="relative flex items-center justify-center">
          {testimonials.map(
            (testimonial, index) =>
              index === current && (
                <div
                  key={index}
                  className="text-center transition-opacity duration-500 ease-in-out transform scale-100 hover:scale-105"
                >
                  <FaQuoteLeft className="text-2xl md:text-3xl text-yellow-400 mb-4 mx-auto" />
                  <p className="text-lg md:text-2xl text-gray-100 italic max-w-3xl mx-auto leading-relaxed px-4">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={96}
                      height={96}
                      className="rounded-full h-20 w-20 md:h-24 md:w-24 border-4 border-yellow-400 shadow-lg"
                      unoptimized
                    />
                    <div className="text-center md:text-left">
                      <h4 className="text-xl md:text-2xl text-gray-100 font-semibold">
                        {testimonial.name}
                      </h4>
                      <h5 className="text-md md:text-lg text-gray-300">
                        {testimonial.title}
                      </h5>
                    </div>
                  </div>
                </div>
              )
          )}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-4 md:left-8">
            <div
              className="bg-yellow-900/20 p-3 md:p-4 rounded-full cursor-pointer shadow-lg hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-colors duration-300 border border-yellow-400/30"
              onClick={previous}
            >
              <FaChevronLeft className="text-yellow-400 text-xl md:text-2xl" />
            </div>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-4 md:right-8">
            <div
              className="bg-yellow-900/20 p-3 md:p-4 rounded-full cursor-pointer shadow-lg hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-colors duration-300 border border-yellow-400/30"
              onClick={next}
            >
              <FaChevronRight className="text-yellow-400 text-xl md:text-2xl" />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 md:mt-12">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`cursor-pointer h-3 w-3 md:h-4 md:w-4 mx-1 md:mx-2 rounded-full ${
                index === current
                  ? 'bg-yellow-400'
                  : 'bg-gray-600 dark:bg-gray-400/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
