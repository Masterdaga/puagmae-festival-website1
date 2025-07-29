"use client";
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-black py-28 px-4 flex flex-col items-center justify-center overflow-hidden min-h-[80vh]">
      {/* Gold radial gradient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{background: 'radial-gradient(circle at 50% 30%, rgba(255,215,0,0.18) 0%, rgba(0,0,0,0.9) 70%)'}} />
      {/* Logo or festival art placeholder, larger and overlapping headline */}
      <div className="relative z-10 mb-0 flex justify-center -mb-16">
        <div className="w-40 h-40 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-300 ring-8 ring-yellow-200/30">
          <span className="text-black text-4xl font-extrabold font-serif">LOGO</span>
        </div>
      </div>
      {/* Headline with gold gradient text, animated */}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center leading-tight bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 bg-clip-text text-transparent animate-fade-in-up"
        style={{textShadow: '0 4px 32px rgba(255,215,0,0.25)'}}>
        The 7th Puagmae Festival
      </h1>
      {/* Elegant Rastafarian accent lines */}
      <div className="flex flex-row items-center justify-center gap-2 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <span className="inline-block w-12 h-1 bg-green-500 rounded-full" />
        <span className="inline-block w-12 h-1 bg-yellow-400 rounded-full" />
        <span className="inline-block w-12 h-1 bg-red-500 rounded-full" />
      </div>
      {/* Subheadline with gold highlight */}
      <p className="text-2xl md:text-3xl mb-10 text-yellow-100 font-medium text-center max-w-3xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <span className="bg-yellow-900/30 px-2 py-1 rounded">Celebrate culture, unity, and unforgettable moments</span> at the Puagmae Festival closing ceremony.<br />Join us for vibrant performances, art, and community spirit!
      </p>
      {/* Animated CTA button */}
      <a href="#register" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-14 py-5 rounded-full font-bold shadow-lg border-2 border-yellow-400 hover:scale-105 hover:shadow-2xl transition-transform duration-200 text-xl animate-fade-in-up" style={{animationDelay: '0.6s'}}>
        Register Now
      </a>
      {/* Event details floating at the bottom */}
      <div className="mt-16 text-yellow-200 text-lg font-semibold text-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
        Tuesday, Sep 10 · 4:00pm – 12:00am<br />At Adwa Museum
      </div>
      {/* Keyframe animations (add to global CSS if not present) */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </section>
  );
} 