import Navbar from './components/Navbar';
import LandingCarousel from './components/LandingCarousel';
import CountdownTimer from './components/CountdownTimer';
import Testimonials from './components/Testimonials';
import Link from 'next/link'; 




export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
  
  <div
    className="fixed inset-0 bg-cover bg-center -z-10"
    style={{ backgroundImage: "url('/new-adeyababa.jpg')" }}
  />
  
  
  <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3b2f23] to-black opacity-80 -z-10" />

     
      <Navbar />

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Day 1 - Peace and Love */}
              <div className="group relative bg-gradient-to-br from-[#2d2217] to-black rounded-2xl p-6 border border-yellow-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-yellow-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">Peace & Love Day</h3>
                  <p className="text-yellow-100/70 text-sm leading-relaxed">
                    Peace talks, cultural exchange, candlelight ceremony, opening parade
                  </p>
                </div>
              </div>
              
              {/* Day 2 - Pan-Africanism */}
              <div className="group relative bg-gradient-to-br from-[#2d2217] to-black rounded-2xl p-6 border border-yellow-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-yellow-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">Pan-Africanism Day</h3>
                  <p className="text-yellow-100/70 text-sm leading-relaxed">
                    Keynote talks, African unity workshops, traditional music & dance
                  </p>
                </div>
              </div>
              
              {/* Day 3 - Run on Rain */}
              <div className="group relative bg-gradient-to-br from-[#2d2217] to-black rounded-2xl p-6 border border-yellow-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-yellow-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">Run on Rain Day</h3>
                  <p className="text-yellow-100/70 text-sm leading-relaxed">
                    Community fun run, outdoor games, rain dance, water activities
                  </p>
                </div>
              </div>
              
              {/* Day 4 - Trade Day */}
              <div className="group relative bg-gradient-to-br from-[#2d2217] to-black rounded-2xl p-6 border border-yellow-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-yellow-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-4">Trade Day</h3>
                  <p className="text-yellow-100/70 text-sm leading-relaxed">
                    Artisan market, business networking, craft workshops, food stalls
                  </p>
                </div>
              </div>
              
              {/* Day 5 - Beauty Day */}
              <div className="group relative bg-gradient-to-br from-[#2d2217] to-black rounded-2xl p-6 border border-yellow-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 shadow-lg">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-yellow-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">Beauty Day</h3>
                  <p className="text-yellow-100/70 text-sm leading-relaxed">
                    Fashion show, art exhibition, cultural showcase, grand pageant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <section className="py-24 px-4 relative">
          
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
              
              <Link href="/Registration">
                <button className="group relative px-10 py-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-full text-xl shadow-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-400/40">
                  <span className="relative z-10">Register Now</span>
                  <span className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-30 group-hover:opacity-60 transition-all duration-300 pointer-events-none"></span>
                </button>
              </Link>
              <Link href="/about">
               <button className="px-10 py-5 border-2 border-yellow-400 text-yellow-200 font-semibold rounded-full text-xl bg-black/40 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30">
                Learn More
               </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
