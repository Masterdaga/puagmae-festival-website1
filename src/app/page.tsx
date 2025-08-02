import Navbar from './components/Navbar';
import LandingCarousel from './components/LandingCarousel';
import HeroSection from './HeroSection';
import CountdownTimer from './components/CountdownTimer';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <main className="min-h-screen relative bg-gradient-to-br from-black via-[#3b2f23] to-black overflow-x-hidden">
      {/* Navbar overlays everything */}
      <Navbar />

      {/* Animated gold blur background */}
      <div
        className="pointer-events-none fixed top-[-10%] left-1/2 -translate-x-1/2 z-0"
        aria-hidden="true"
      >
        <div className="w-[600px] h-[600px] bg-yellow-700 opacity-30 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      {/* Optional: Add more animated circles for depth */}
      <div
        className="pointer-events-none fixed bottom-[-15%] right-[-10%] z-0"
        aria-hidden="true"
      >
        <div className="w-[400px] h-[400px] bg-yellow-900 opacity-20 rounded-full blur-2xl animate-pulse-slower" />
      </div>

      <div className="relative z-10">
        <LandingCarousel />

        {/* Countdown Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-yellow-400">Countdown to</span>
                <br />
                <span className="text-white">The Festival</span>
              </h2>
              <p className="text-xl text-yellow-100/70 max-w-2xl mx-auto">
                Don't miss out on the most anticipated cultural event of the year
              </p>
            </div>
            <CountdownTimer />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                What to Expect
              </h2>
              <p className="text-xl text-yellow-100/70 max-w-3xl mx-auto">
                Experience the ultimate celebration with world-class performances, 
                cultural exhibitions, and unforgettable moments
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="group relative bg-gradient-to-br from-[#2d2217] to-black rounded-2xl p-8 border border-yellow-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-yellow-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Live Music</h3>
                  <p className="text-yellow-100/70 leading-relaxed">
                    Experience electrifying performances from top artists and emerging talents
                  </p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="group relative bg-gradient-to-br from-[#2d2217] to-black rounded-2xl p-8 border border-yellow-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-yellow-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Cultural Arts</h3>
                  <p className="text-yellow-100/70 leading-relaxed">
                    Immerse yourself in traditional and contemporary cultural expressions
                  </p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="group relative bg-gradient-to-br from-[#2d2217] to-black rounded-2xl p-8 border border-yellow-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-yellow-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Workshops</h3>
                  <p className="text-yellow-100/70 leading-relaxed">
                    Learn from masters in interactive workshops and skill-building sessions
                  </p>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="group relative bg-gradient-to-br from-[#2d2217] to-black rounded-2xl p-8 border border-yellow-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-yellow-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Community</h3>
                  <p className="text-yellow-100/70 leading-relaxed">
                    Connect with like-minded individuals and build lasting friendships
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 relative">
          {/* Gold animated blur behind buttons */}
          <div className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <div className="w-[340px] h-[120px] bg-yellow-500 opacity-30 rounded-full blur-2xl animate-pulse-slow"></div>
          </div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Experience
              <br />
              <span className="text-yellow-400">
                Something Amazing?
              </span>
            </h2>
            <p className="text-xl text-yellow-100/80 mb-12 max-w-2xl mx-auto">
              Join thousands of festival-goers for an unforgettable celebration of culture, 
              music, and community spirit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-full text-xl shadow-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-400/40">
                <span className="relative z-10">Get Your Tickets</span>
                {/* Gold glow ring */}
                <span className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-30 group-hover:opacity-60 transition-all duration-300 pointer-events-none"></span>
              </button>
              <button className="px-10 py-5 border-2 border-yellow-400 text-yellow-200 font-semibold rounded-full text-xl bg-black/40 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}