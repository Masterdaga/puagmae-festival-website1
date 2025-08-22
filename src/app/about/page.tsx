"use client";
import { useState } from "react";

export default function AboutPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => setIsExpanded((v) => !v);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/new-adeyababa.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3b2f23] to-black opacity-80 -z-10" />
      <div className="pointer-events-none fixed top-0 left-0 z-0">
        <div className="w-40 h-40 bg-yellow-500 opacity-20 rounded-full blur-2xl" />
      </div>

      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
              About the <span className="text-[#f5e7b2]">Puagmae Festival</span>
            </h1>
            <div className="w-32 h-1 mx-auto rounded bg-gradient-to-r from-yellow-400 to-yellow-600 mt-4" />
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1 bg-black/70 rounded-2xl border border-yellow-500 shadow-xl px-8 py-8 space-y-4 min-w-[280px] max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed text-yellow-200">
                The Puagmae Festival is a grand celebration of the African Golden 13th Month, a unique cultural event that brings together people from all walks of life to celebrate our rich heritage and traditions. From vibrant performances and cultural displays to delicious food and lively music, this festival is a true reflection of our diverse and colorful culture. Like the Egyptian Coptic calendar, the Ethiopian calendar has a year of 13 months. The first 12 months have 30 days each, and the last 13th month has 5 days and 6 days in a leap year. The name of the 13th month is in Ge'ez and is known as PAGUMIENE. This uniquely short but sweet month of PAGUMIENE just started here in Ethiopia and is going to last for the next six days or five days.
              </p>
            </div>

            <div className="flex items-center justify-center mt-8 md:mt-0">
              <div className="w-96 h-56 rounded-2xl shadow-2xl flex items-end justify-start border border-yellow-500 overflow-hidden relative">
                <img
                  src="photos/img22.jpg"
                  alt="Puagmae festival"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 p-4 bg-black/40 w-full">
                  <span className="text-yellow-100 text-2xl font-extrabold drop-shadow-lg tracking-wide">PUAGMAE FESTIVAL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleReadMore}
              className="w-full max-w-3xl mx-auto px-10 py-5 rounded-full text-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 text-black border border-yellow-500"
              style={{ display: "block" }}
            >
              {isExpanded ? "Read Less" : "Learn More"}
            </button>
          </div>

          {isExpanded && (
            <div className="mt-12 flex justify-center">
              <div className="bg-black/80 rounded-2xl border border-yellow-500 max-w-4xl w-full shadow-xl p-12 space-y-8">
                <p className="text-lg leading-relaxed text-yellow-200">
                  At the heart of the Puagmae Festival is the aspiration to represent collective cultural knowledge in a grassroots way. This approach encourages the free and informed participation of tradition bearers who it is hoped will play a central role in the shape of the festival's development and overall outcome.
                </p>
                <p className="text-lg leading-relaxed text-yellow-200">
                  The Puagmae Festival is an opportunity for people to come together and share their stories, traditions, and customs. The festival features a variety of events including traditional dance performances, music concerts, art exhibitions, and food fairs. These events provide a platform for artists and performers to showcase their talents and for attendees to immerse themselves in the rich cultural tapestry of Ethiopia.
                </p>

                <p className="text-lg leading-relaxed text-yellow-200">
                  One of the highlights of the festival is the traditional coffee ceremony, which is an integral part of Ethiopian culture. The ceremony involves roasting coffee beans, grinding them, and brewing the coffee in a special pot called a jebena. This ritual is a symbol of hospitality and community, bringing people together to enjoy the rich flavors and aromas of Ethiopian coffee.
                </p>
                <p className="text-lg leading-relaxed text-yellow-200">
                  The Puagmae Festival is not just a celebration of the past but also a time to look forward to the future. It provides a space for dialogue and exchange, fostering a sense of unity and shared identity among participants. Whether you are a local resident or a visitor, the Puagmae Festival offers a unique and enriching experience that will leave you with lasting memories.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-black/80 rounded-2xl border border-yellow-500 shadow-xl p-10 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Our Story</h3>
              <p className="text-yellow-200">
                Celebrating the unique 13th month of the Ethiopian calendar, PAGUMIENE, through vibrant cultural expressions and community unity.
              </p>
            </div>
            <div className="text-center bg-black/80 rounded-2xl border border-yellow-500 shadow-xl p-10 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">The 13th Month</h3>
              <p className="text-yellow-200">
                A unique 5-6 day period in the Ethiopian calendar, PAGUMIENE, celebrated with special cultural significance and traditional ceremonies.
              </p>
            </div>
            <div className="text-center bg-black/80 rounded-2xl border border-yellow-500 shadow-xl p-10 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Our Values</h3>
              <p className="text-yellow-200">
                Unity, cultural preservation, community participation, and grassroots representation of collective cultural knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}