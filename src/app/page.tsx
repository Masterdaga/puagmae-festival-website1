import HeroSection from './HeroSection';
import CountdownTimer from './components/CountdownTimer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      
      {/* Countdown Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-4xl">
          <CountdownTimer />
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-16">
            Explore the Festival
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-black text-2xl">📅</span>
              </div>
              <h3 className="text-yellow-400 text-xl font-bold text-center mb-4">Program</h3>
              <p className="text-yellow-100 text-center mb-6">Discover the full schedule of performances, workshops, and cultural activities.</p>
              <a href="/schedule" className="block text-center bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                View Schedule
              </a>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-black text-2xl">🎟️</span>
              </div>
              <h3 className="text-yellow-400 text-xl font-bold text-center mb-4">Get Tickets</h3>
              <p className="text-yellow-100 text-center mb-6">Secure your spot at the most anticipated cultural event of the year.</p>
              <a href="/tickets" className="block text-center bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                Get Tickets
              </a>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-black text-2xl">🤝</span>
              </div>
              <h3 className="text-yellow-400 text-xl font-bold text-center mb-4">Volunteer</h3>
              <p className="text-yellow-100 text-center mb-6">Join our community and help make this festival an unforgettable experience.</p>
              <a href="/get-involved" className="block text-center bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                Get Involved
              </a>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-black text-2xl">📸</span>
              </div>
              <h3 className="text-yellow-400 text-xl font-bold text-center mb-4">Gallery</h3>
              <p className="text-yellow-100 text-center mb-6">Explore photos and videos from previous festivals and cultural celebrations.</p>
              <a href="/gallery" className="block text-center bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                View Gallery
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}