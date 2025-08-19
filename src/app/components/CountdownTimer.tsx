"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Prevent hydration mismatch by ensuring client-side only rendering
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [festivalState, setFestivalState] = useState('countdown'); // 'countdown', 'during', 'ended'
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Set the target dates
    const festivalStart = new Date('2025-09-06T09:00:00').getTime();
    const festivalEnd = new Date('2025-09-10T21:00:00').getTime(); // 9:00 PM

    const timer = setInterval(() => {
      const now = new Date().getTime();
      
      if (now < festivalStart) {
        // Before festival - countdown
        const distance = festivalStart - now;
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
        setFestivalState('countdown');
      } else if (now >= festivalStart && now <= festivalEnd) {
        // During festival
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setFestivalState('during');
      } else {
        // After festival
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setFestivalState('ended');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Slogan Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="text-yellow-300">Come dance.</span>
            <br />
            <span className="text-yellow-200">Come eat.</span>
            <br />
            <span className="text-yellow-100">Come connect.</span>
          </h1>
          <p className="text-lg md:text-xl text-yellow-100/90 mb-8 leading-relaxed max-w-4xl mx-auto">
            Come be part of a celebration that honors our past, ignites our present, and shapes our future.
          </p>
          <div className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 p-6 rounded-2xl border border-yellow-400/30 mb-12">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-yellow-200 font-semibold text-lg">
                Mark the dates. Pack your bags. Bring your spirit.
              </p>
            </div>
            <p className="text-yellow-100/80 text-base">
              Addis Ababa is waiting - and so is Africa.
            </p>
          </div>
        </div>

        {/* Countdown Display */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-2">
            Countdown to Puagmae Festival 2025
          </h2>
          <p className="text-lg text-amber-100/80 mb-2">September 6-10, 2025 • 9:00 AM - 9:00 PM • Entoto Park</p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative">
              <div className="relative bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/10">
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2">
                    --
                  </div>
                  <div className="text-yellow-200/70 text-sm font-medium uppercase tracking-wider">
                    {i === 1 ? 'Days' : i === 2 ? 'Hours' : i === 3 ? 'Minutes' : 'Seconds'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // During festival
  if (festivalState === 'during') {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Slogan Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="text-yellow-300">Come dance.</span>
            <br />
            <span className="text-yellow-200">Come eat.</span>
            <br />
            <span className="text-yellow-100">Come connect.</span>
          </h1>
          <p className="text-lg md:text-xl text-yellow-100/90 mb-8 leading-relaxed max-w-4xl mx-auto">
            Come be part of a celebration that honors our past, ignites our present, and shapes our future.
          </p>
          <div className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 p-6 rounded-2xl border border-yellow-400/30 mb-12">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-yellow-200 font-semibold text-lg">
                Mark the dates. Pack your bags. Bring your spirit.
              </p>
            </div>
            <p className="text-yellow-100/80 text-base">
              Addis Ababa is waiting - and so is Africa.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/50">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
              The Festival is Happening Now!
            </h2>
            <p className="text-green-200/90 text-lg mb-4">
              Welcome to Puagmae Festival 2025!
            </p>
            <p className="text-green-200/80 text-sm mb-4">
              Events are running from 9:00 AM to 9:00 PM daily at Entoto Park
            </p>
            <div className="bg-green-500/20 p-4 rounded-lg border border-green-400/30">
              <p className="text-green-300 font-semibold">Festival Status: LIVE</p>
              <p className="text-green-200/80 text-sm">September 6-10, 2025</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // After festival
  if (festivalState === 'ended') {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Slogan Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="text-yellow-300">Come dance.</span>
            <br />
            <span className="text-yellow-200">Come eat.</span>
            <br />
            <span className="text-yellow-100">Come connect.</span>
          </h1>
          <p className="text-lg md:text-xl text-yellow-100/90 mb-8 leading-relaxed max-w-4xl mx-auto">
            Come be part of a celebration that honors our past, ignites our present, and shapes our future.
          </p>
          <div className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 p-6 rounded-2xl border border-yellow-400/30 mb-12">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-yellow-200 font-semibold text-lg">
                Mark the dates. Pack your bags. Bring your spirit.
              </p>
            </div>
            <p className="text-yellow-100/80 text-base">
              Addis Ababa is waiting - and so is Africa.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 backdrop-blur-md rounded-2xl p-8 border border-blue-400/50">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
              Festival 2025 Has Ended
            </h2>
            <p className="text-blue-200/90 text-lg mb-4">
              Thank you for being part of Puagmae Festival 2025!
            </p>
            <p className="text-blue-200/80 text-sm mb-4">
              We hope you enjoyed the amazing events from September 6-10
            </p>
            <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400/30">
              <p className="text-blue-300 font-semibold">Festival Status: COMPLETED</p>
              <p className="text-blue-200/80 text-sm">Stay tuned for next year's festival!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Before festival - countdown
  return (
    <div className="max-w-4xl mx-auto">
      {/* Slogan Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          <span className="text-yellow-300">Come dance.</span>
          <br />
          <span className="text-yellow-200">Come eat.</span>
          <br />
          <span className="text-yellow-100">Come connect.</span>
        </h1>
        <p className="text-lg md:text-xl text-yellow-100/90 mb-8 leading-relaxed max-w-4xl mx-auto">
          Come be part of a celebration that honors our past, ignites our present, and shapes our future.
        </p>
        <div className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 p-6 rounded-2xl border border-yellow-400/30 mb-12">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-yellow-200 font-semibold text-lg">
              Mark the dates. Pack your bags. Bring your spirit.
            </p>
          </div>
          <p className="text-yellow-100/80 text-base">
            Addis Ababa is waiting - and so is Africa.
          </p>
        </div>
      </div>

      {/* Countdown Display */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-2">
          Countdown to Puagmae Festival 2025
        </h2>
        <p className="text-lg text-amber-100/80 mb-2">September 6-10, 2025 • 9:00 AM - 9:00 PM • Entoto Park</p>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto rounded-full"></div>
      </div>
      
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
};

// Export with dynamic import to prevent SSR issues
export default dynamic(() => Promise.resolve(CountdownTimer), {
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto">
      {/* Slogan Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          <span className="text-yellow-300">Come dance.</span>
          <br />
          <span className="text-yellow-200">Come eat.</span>
          <br />
          <span className="text-yellow-100">Come connect.</span>
        </h1>
        <p className="text-lg md:text-xl text-yellow-100/90 mb-8 leading-relaxed max-w-4xl mx-auto">
          Come be part of a celebration that honors our past, ignites our present, and shapes our future.
        </p>
        <div className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 p-6 rounded-2xl border border-yellow-400/30 mb-12">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-yellow-200 font-semibold text-lg">
              Mark the dates. Pack your bags. Bring your spirit.
            </p>
          </div>
          <p className="text-yellow-100/80 text-base">
            Addis Ababa is waiting - and so is Africa.
          </p>
        </div>
      </div>

      {/* Countdown Display */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-2">
          Countdown to Puagmae Festival 2025
        </h2>
        <p className="text-lg text-amber-100/80 mb-2">September 6-10, 2025 • 9:00 AM - 9:00 PM • Entoto Park</p>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="group relative">
            <div className="relative bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/10">
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2">
                  --
                </div>
                <div className="text-yellow-200/70 text-sm font-medium uppercase tracking-wider">
                  {i === 1 ? 'Days' : i === 2 ? 'Hours' : i === 3 ? 'Minutes' : 'Seconds'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}); 