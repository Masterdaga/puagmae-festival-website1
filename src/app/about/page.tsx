"use client";
import { useState } from 'react';

export default function AboutPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-900 to-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400">
              About the Puagmae Festival
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                The Puagmae Festival is a grand celebration of the African Golden 13th Month, a unique cultural event that brings together people from all walks of life to celebrate our rich heritage and traditions. From vibrant performances and cultural displays to delicious food and lively music, this festival is a true reflection of our diverse and colorful culture.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                Like the Egyptian Coptic calendar, the Ethiopian calendar has a year of 13 months. The first 12 months have 30 days each, and the last 13th month has 5 days and 6 days in a leap year. The name of the 13th month is in Ge'ez and is known as PAGUMIENE. This uniquely short but sweet month of PAGUMIENE just started here in Ethiopia and is going to last for the next six days or five days.
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-2xl flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                <span className="text-black text-2xl font-bold">FESTIVAL IMAGE</span>
              </div>
            </div>
          </div>

          {/* Learn More Button */}
          <div className="text-center mt-16">
            <button 
              onClick={handleReadMore}
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isExpanded ? 'Read Less' : 'Learn More'}
            </button>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-16">
              <div className="bg-blue-900/50 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/20 max-w-4xl mx-auto">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-gray-300">
                    At the heart of the Puagmae Festival is the aspiration to represent collective cultural knowledge in a grassroots way. This approach encourages the free and informed participation of tradition bearers who it is hoped will play a central role in the shape of the festival's development and overall outcome.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-gray-300">
                    The Puagmae Festival is an opportunity for people to come together and share their stories, traditions, and customs. The festival features a variety of events including traditional dance performances, music concerts, art exhibitions, and food fairs. These events provide a platform for artists and performers to showcase their talents and for attendees to immerse themselves in the rich cultural tapestry of Ethiopia.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-gray-300">
                    One of the highlights of the festival is the traditional coffee ceremony, which is an integral part of Ethiopian culture. The ceremony involves roasting coffee beans, grinding them, and brewing the coffee in a special pot called a jebena. This ritual is a symbol of hospitality and community, bringing people together to enjoy the rich flavors and aromas of Ethiopian coffee.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-gray-300">
                    The festival also includes cultural sharing from all over African countries, where participants can learn about different customs, languages, and traditions. There are also lively music performances featuring traditional and contemporary African music, fashion shows showcasing vibrant African attire, and cultural trade where artisans and traders display their unique crafts and goods.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-gray-300">
                    The Puagmae Festival is not just a celebration of the past but also a time to look forward to the future. It provides a space for dialogue and exchange, fostering a sense of unity and shared identity among participants. Whether you are a local resident or a visitor, the Puagmae Festival offers a unique and enriching experience that will leave you with lasting memories.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Our Story */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Our Story</h3>
              <p className="text-gray-300">
                Celebrating the unique 13th month of the Ethiopian calendar, PAGUMIENE, through vibrant cultural expressions and community unity.
              </p>
            </div>

            {/* The 13th Month */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">The 13th Month</h3>
              <p className="text-gray-300">
                A unique 5-6 day period in the Ethiopian calendar, PAGUMIENE, celebrated with special cultural significance and traditional ceremonies.
              </p>
            </div>

            {/* Our Values */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Our Values</h3>
              <p className="text-gray-300">
                Unity, cultural preservation, community participation, and grassroots representation of collective cultural knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 