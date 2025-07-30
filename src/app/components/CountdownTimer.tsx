"use client";
import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set the target date: September 10, 2025 at 4:00 PM
    const targetDate = new Date('2025-09-10T16:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {/* Days */}
        <div className="group relative">
          <div className="relative bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 animate-pulse">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <div className="text-yellow-200/70 text-sm font-medium uppercase tracking-wider">Days</div>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="group relative">
          <div className="relative bg-gradient-to-br from-yellow-700/20 to-yellow-800/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-yellow-700/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 animate-pulse">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-yellow-200/70 text-sm font-medium uppercase tracking-wider">Hours</div>
            </div>
          </div>
        </div>

        {/* Minutes */}
        <div className="group relative">
          <div className="relative bg-gradient-to-br from-yellow-800/20 to-yellow-900/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-700/10 to-yellow-800/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 animate-pulse">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-yellow-200/70 text-sm font-medium uppercase tracking-wider">Minutes</div>
            </div>
          </div>
        </div>

        {/* Seconds */}
        <div className="group relative">
          <div className="relative bg-gradient-to-br from-yellow-900/20 to-black/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/10 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-800/10 to-yellow-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 animate-pulse">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-yellow-200/70 text-sm font-medium uppercase tracking-wider">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 