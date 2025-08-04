'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const schedule = [
  {
    date: 'Sept 6, 2025',
    theme: 'Peace and Love Day',
    image: "/peace_africa_day.jpg",
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
    date: 'Sept 7, 2025',
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
    date: 'Sept 8, 2025',
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
    date: 'Sept 9, 2025',
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
    date: 'Sept 10, 2025',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-900 to-yellow-700 relative overflow-hidden pt-24 pb-12">
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

                          {/* Image Display */}
                          <div className={`${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                            <div className="w-full h-56 rounded-xl overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.theme}
                                className="w-full h-full object-cover"
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

        {/* Simple Location Box */}
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md mx-auto">
          <div 
            className="cursor-pointer"
            onClick={() => setShowMap(!showMap)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Venue: Entoto Park
              </h3>
              <span className="text-amber-600 font-medium">
                {showMap ? 'Hide Map' : 'Show Map'}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">Click to {showMap ? 'hide' : 'view'} location map</p>
          </div>

          <AnimatePresence>
            {showMap && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="aspect-w-16 aspect-h-9 mb-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                    <div>
                      <p className="text-gray-600 font-medium">[Map of Entoto Park]</p>
                      <p className="text-sm text-gray-500">Click to open in Google Maps</p>
                    </div>
                  </div>
                  <a 
                    href="https://g.co/kgs/qw7VWBG" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Open in Maps
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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