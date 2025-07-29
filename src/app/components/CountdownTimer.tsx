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
    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/30">
      <h3 className="text-yellow-400 text-2xl font-bold text-center mb-6">
        Festival Starts In
      </h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="bg-yellow-400 text-black text-3xl md:text-4xl font-bold rounded-lg p-4 mb-2">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-yellow-200 text-sm font-medium">Days</div>
        </div>
        <div className="text-center">
          <div className="bg-yellow-400 text-black text-3xl md:text-4xl font-bold rounded-lg p-4 mb-2">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-yellow-200 text-sm font-medium">Hours</div>
        </div>
        <div className="text-center">
          <div className="bg-yellow-400 text-black text-3xl md:text-4xl font-bold rounded-lg p-4 mb-2">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-yellow-200 text-sm font-medium">Minutes</div>
        </div>
        <div className="text-center">
          <div className="bg-yellow-400 text-black text-3xl md:text-4xl font-bold rounded-lg p-4 mb-2">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-yellow-200 text-sm font-medium">Seconds</div>
        </div>
      </div>
    </div>
  );
} 