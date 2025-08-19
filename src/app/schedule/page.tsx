'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const schedule = [
  {
    date: 'PUAGME 1 - September 6, 2025',
    theme: 'Peace and Love Day',
    image: "/peace_and_love.jpg",
    activities: [
      'Peace talks and dialogue circles',
      'Cultural exchange sessions',
      'Candlelight ceremony for unity',
      'Friendship bracelet making',
      'Opening parade'
    ],
    color: 'from-amber-100 to-yellow-50'
  },
  {
    date: 'PUAGME 2 - September 7, 2025',
    theme: 'Pan-Africanism Day',
    image: "/panafricanism_day.jpg",
    activities: [
      'Keynote on Pan-Africanism',
      'African unity workshops',
      'Traditional music & dance',
      'Panel: Shared African history',
      'Flag procession'
    ],
    color: 'from-orange-100 to-amber-50'
  },
  {
    date: 'PUAGME 3 - September 8, 2025',
    theme: 'Run on Rain Day',
    image: "/children_on_rain.jpg",
    activities: [
      'Community fun run',
      'Outdoor games & relays',
      'Rain dance performance',
      'Water balloon contest',
      'Picnic in the park'
    ],
    color: 'from-blue-100 to-cyan-50'
  },
  {
    date: 'PUAGME 4 - September 9, 2025',
    theme: 'Trade Day',
    image: "/trade.jpg",
    activities: [
      'Local artisan market',
      'Business networking forum',
      'Craft workshops',
      'Food stalls & tasting',
      'Entrepreneurship panel'
    ],
    color: 'from-emerald-100 to-green-50'
  },
  {
    date: 'PUAGME 5 - September 10, 2025',
    theme: 'Beauty Day',
    image: "/a_runway_scene_fea_image_.jpg",
    activities: [
      'Fashion show',
      'Art exhibition',
      'Cultural showcase',
      'Grand pageant',
      'Awards ceremony'
    ],
    color: 'from-purple-100 to-fuchsia-50'
  }
];

export default function FestivalSchedule() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pt-24 pb-12">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/new-adeyababa.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3b2f23] to-black opacity-80 -z-10" />
      
      {/* Subtle gold accent */}
      <div className="pointer-events-none fixed top-0 left-0 z-0">
        <div className="w-40 h-40 bg-yellow-500 opacity-20 rounded-full blur-2xl" />
      </div>

      {/* Background and main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-4">
            FESTIVAL SCHEDULE
          </h1>
          <p className="text-lg text-amber-100/80 mb-2">All events: 9:00 AM - 9:00 PM</p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto rounded-full"></div>
        </div>
        {/* Schedule Cards */}
        <div className="space-y-6">
          {schedule.map((item, idx) => (
            <motion.div
              key={idx}
              className={`bg-white/95 rounded-2xl shadow-lg ${
                openIndex === idx ? 'ring-1 ring-amber-400/20' : ''
              }`}
            >
              {/* Card Header */}
              <div className="p-6 cursor-pointer" onClick={() => handleToggle(idx)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-xl font-bold text-white">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {item.theme}
                      </h3>
                      <span className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xl font-bold text-white">
                      {openIndex === idx ? '−' : '+'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`border-t border-amber-200/30 bg-gradient-to-r ${item.color}`}>
                      <div className="p-6">
                        <div className={`grid md:grid-cols-2 gap-6 items-start ${
                          idx % 2 === 1 ? 'md:grid-flow-col-dense' : ''
                        }`}>
                          {/* Activities List */}
                          <div className={`space-y-4 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                            <h4 className="text-xl font-semibold text-slate-800 mb-2">
                              Event Schedule
                            </h4>
                            <ul className="space-y-3">
                              {item.activities.map((activity, i) => (
                                <motion.li
                                  key={i}
                                  className="flex items-start"
                                >
                                  <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                                  <span className="text-base font-medium text-slate-700">
                                    {activity}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          {/* Image Display - Updated to show just the image */}
                          <div className={`${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                            <div className="w-full h-56 rounded-xl overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.theme}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Location Box */}
<div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md mx-auto border border-amber-200/30">
  <div 
    className="cursor-pointer group"
    onClick={() => setShowMap(!showMap)}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-slate-800 flex items-center">
        <svg className="w-5 h-5 mr-2 text-amber-600 group-hover:text-amber-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Venue: Entoto Park
      </h3>
      <span className="text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
        {showMap ? 'Hide Map' : 'Show Map'}
        <svg 
          className={`w-4 h-4 ml-1 inline transition-transform ${showMap ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
    <p className="text-sm text-slate-600 mt-1">Click to {showMap ? 'hide' : 'view'} location details</p>
  </div>

  <AnimatePresence>
    {showMap && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 overflow-hidden"
      >
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-100">
          <div className="aspect-w-16 aspect-h-9 mb-4 bg-white rounded-lg overflow-hidden shadow-sm border border-amber-200/50">
            {/* Map placeholder with festival-themed overlay */}
            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-24 h-24 text-amber-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div className="relative z-10 text-center p-4">
                <p className="text-lg font-medium text-amber-800 mb-1">Entoto Park</p>
                <p className="text-sm text-amber-700/90">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200/50">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-slate-700">9AM - 9PM</span>
              </div>
            </div>
            <div className="bg-white/80 rounded-lg p-3 border border-amber-200/50">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium text-slate-700">Outdoor Venue</span>
              </div>
            </div>
          </div>

          <a 
            href="https://g.co/kgs/qw7VWBG" 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-lg shadow-md hover:from-amber-600 hover:to-yellow-600 transition-all"
          >
            Open in Google Maps
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
        </div>
      </div>
  );
}