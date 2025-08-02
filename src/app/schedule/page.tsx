'use client';

import React, { useState } from 'react';

const schedule = [
  {
    date: 'Sept 6, 2025',
    theme: 'Peace and Love Day',
    activities: [
      'Peace talks and dialogue circles',
      'Cultural exchange sessions',
      'Candlelight ceremony for unity',
      'Friendship bracelet making',
      'Opening parade'
    ]
  },
  {
    date: 'Sept 7, 2025',
    theme: 'Pan-Africanism Day',
    activities: [
      'Keynote on Pan-Africanism',
      'African unity workshops',
      'Traditional music & dance',
      'Panel: Shared African history',
      'Flag procession'
    ]
  },
  {
    date: 'Sept 8, 2025',
    theme: 'Run on Rain Day',
    activities: [
      'Community fun run',
      'Outdoor games & relays',
      'Rain dance performance',
      'Water balloon contest',
      'Picnic in the park'
    ]
  },
  {
    date: 'Sept 9, 2025',
    theme: 'Trade Day',
    activities: [
      'Local artisan market',
      'Business networking forum',
      'Craft workshops',
      'Food stalls & tasting',
      'Entrepreneurship panel'
    ]
  },
  {
    date: 'Sept 10, 2025',
    theme: 'Beauty Day',
    activities: [
      'Fashion show',
      'Art exhibition',
      'Cultural showcase',
      'Grand pageant',
      'Awards ceremony'
    ]
  }
];

export default function App() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-900 via-amber-800 to-yellow-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-300 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">Festival Schedule</h1>
          <p className="text-amber-100 text-xl font-medium">September 2025 Celebration</p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="space-y-4">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-l-8 border-amber-500 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-[1.02] ${
                openIndex === idx ? 'ring-2 ring-amber-400 shadow-2xl scale-[1.02] border-l-amber-600' : 'hover:border-l-amber-600'
              }`}
              onClick={() => handleToggle(idx)}
            >
              <div className="flex items-center justify-between p-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-800">{item.date}</span>
                  {openIndex !== idx && (
                    <span className="text-sm text-slate-600 mt-1 font-medium">Click to view activities</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-3xl text-slate-800 font-bold transition-transform duration-200">
                    {openIndex === idx ? '−' : '+'}
                  </span>
                </div>
              </div>
              
              {openIndex === idx && (
                <div className="px-6 pb-6 border-t border-amber-200/50">
                  <div className="pt-4">
                    <h2 className="text-3xl font-bold text-black mb-6 flex items-center">
                      <span className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-4"></span>
                      {item.theme}
                    </h2>
                    <div className="bg-gradient-to-r from-amber-50/80 to-yellow-50/80 rounded-xl p-6 backdrop-blur-sm">
                      <ul className="space-y-3">
                        {item.activities.map((activity, i) => (
                          <li key={i} className="flex items-start text-slate-800">
                            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                            <span className="font-semibold text-lg">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-full inline-block font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            🎉 Join us for an unforgettable celebration! 🎉
          </div>
        </div>
      </div>
    </div>
  );
}