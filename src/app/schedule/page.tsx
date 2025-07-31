"use client";
import React, { useState } from 'react';
import { FaCalendarDay } from 'react-icons/fa';

const scheduleData = [
  {
    date: "September 6, 2025",
    title: "Love and Peace Day",
    description: "A day dedicated to celebrating unity, love, and peace among all participants.",
    detailDescription: "• Opening ceremony\n• Peace walk\n• Unity workshops\n• Evening concert"
  },
  {
    date: "September 7, 2025",
    title: "Pan-Africanism Day",
    description: "Honoring the spirit of Pan-Africanism with cultural showcases and discussions.",
    detailDescription: "• Pan-African panel talks\n• Cultural exhibitions\n• African cuisine fair\n• Drum circle"
  },
  {
    date: "September 8, 2025",
    title: "Run on the Rain Day",
    description: "Experience the joy of running and dancing in the rain, celebrating resilience and fun.",
    detailDescription: "• Morning fun run\n• Rain dance\n• Outdoor games\n• Storytelling by the fire"
  },
  {
    date: "September 9, 2025",
    title: "Trading Day",
    description: "A vibrant day of trading, local crafts, and entrepreneurship.",
    detailDescription: "• Artisan market\n• Trading workshops\n• Business networking\n• Live demonstrations"
  },
  {
    date: "September 10, 2025",
    title: "Beauty Day",
    description: "Celebrating beauty in all its forms with showcases and competitions.",
    detailDescription: "• Beauty pageant\n• Fashion show\n• Hair and makeup demos\n• Self-care workshops"
  }
];

const Schedule = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const toggleReadMore = (index: number) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  return (
    <div className="relative py-20 pb-28 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-yellow-200 transition-colors duration-500 min-h-screen" id="schedule">
      {/* Background Image removed */}
      <div className='max-w-6xl mx-auto px-4'>
        <h2 className="text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
          Festival Schedule
        </h2>
        <div className='flex flex-col space-y-8'>
          {scheduleData.map((event, index) => (
            <div key={index} className="bg-black/60 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-yellow-400/20 flex flex-row items-stretch">
              {/* Event Image on the right for Day 1 only */}
              <div className="flex-1 flex flex-col justify-center p-6">
                <FaCalendarDay size={32} color="#DAA520" style={{ marginRight: '1rem', marginTop: '0.5rem' }} />
                <div className='flex-1'>
                  <h3 className="text-3xl font-bold text-yellow-400 drop-shadow-sm">{event.date}</h3>
                  <h4 className="text-2xl font-semibold mb-2 text-yellow-200">
                    {event.title.split(' ').map((word, i) =>
                      word.toLowerCase() === 'golden' ? (
                        <span key={i} className='text-goldenrod dark:text-goldenrod'>{word} </span>
                      ) : (
                        word + ' '
                      )
                    )}
                  </h4>
                  <div className="text-lg leading-relaxed text-yellow-100">
                    {expandedEvent === index ? (
                      <div className="bg-gradient-to-r from-yellow-900/30 to-black/60 p-4 rounded-md">
                        <p className="font-semibold text-yellow-300 mb-2">Activities to be conducted on that day:</p>
                        <span className="text-yellow-100 whitespace-pre-line">{event.detailDescription}</span>
                      </div>
                    ) : (
                      <p className="text-yellow-100">{event.description}</p>
                    )}
                  </div>
                  <button
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-full font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-700 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 mt-6"
                    onClick={() => toggleReadMore(index)}
                  >
                    {expandedEvent === index ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
              {index === 0 && (
                <div className="flex items-center justify-center w-40 p-0">
                  <div className="bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-2xl shadow-xl flex items-center justify-center h-32 w-32 mr-4 mt-4 mb-4 ml-2">
                    <img
                      src="/africa.jpg"
                      alt={event.title + ' image'}
                      className="object-contain h-24 w-24 rounded-2xl"
                      style={{ display: 'block', margin: '0 auto' }}
                    />
                  </div>
                </div>
              )}
              {index === 1 && (
                <div className="flex items-center justify-center w-40 p-0">
                  <div className="bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-2xl shadow-xl flex items-center justify-center h-32 w-32 mr-4 mt-4 mb-4 ml-2">
                    <img
                      src="/panafricanism.png"
                      alt={event.title + ' image'}
                      className="object-contain h-24 w-24 rounded-2xl"
                      style={{ display: 'block', margin: '0 auto' }}
                    />
                  </div>
                </div>
              )}
              {index === 2 && (
                <div className="flex items-center justify-center w-40 p-0">
                  <div className="bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-2xl shadow-xl flex items-center justify-center h-32 w-32 mr-4 mt-4 mb-4 ml-2">
                    <img
                      src="/runningonrain.jpg"
                      alt={event.title + ' image'}
                      className="object-contain h-24 w-24 rounded-2xl"
                      style={{ display: 'block', margin: '0 auto' }}
                    />
                  </div>
                </div>
              )}
              {index === 3 && (
                <div className="flex items-center justify-center w-40 p-0">
                  <div className="bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-2xl shadow-xl flex items-center justify-center h-32 w-32 mr-4 mt-4 mb-4 ml-2">
                    <img
                      src="/trade day.jpg"
                      alt={event.title + ' image'}
                      className="object-contain h-24 w-24 rounded-2xl"
                      style={{ display: 'block', margin: '0 auto' }}
                    />
                  </div>
                </div>
              )}
              {index === 4 && (
                <div className="flex items-center justify-center w-40 p-0">
                  <div className="bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-2xl shadow-xl flex items-center justify-center h-32 w-32 mr-4 mt-4 mb-4 ml-2">
                    <img
                      src="/a_runway_scene_fea_image_.jpg"
                      alt={event.title + ' image'}
                      className="object-contain h-24 w-24 rounded-2xl"
                      style={{ display: 'block', margin: '0 auto' }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule; 