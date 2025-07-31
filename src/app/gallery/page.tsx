'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaImages, FaPlay, FaExpand } from 'react-icons/fa';

interface GalleryItem {
  year: string;
  title: string;
  image: string;
  type: 'photo' | 'video';
}

const galleryData: GalleryItem[] = [
  {
    year: '2016',
    title: 'PUAGMAE 2016 - Cultural Unity',
    image: '/PUAGMAE 2016/cultural-unity.png',
    type: 'photo'
  },
  {
    year: '2015',
    title: 'PUAGMAE 2015',
    image: '/PUAGMAE 2015/',
    type: 'photo'
  },
  {
    year: '2014',
    title: 'PUAGMAE 2014',
    image: '/PUAGMAE 2014/',
    type: 'photo'
  },
  {
    year: '2013',
    title: 'PUAGMAE 2013',
    image: '/PUAGMAE 2013/',
    type: 'photo'
  },
  {
    year: '2012',
    title: 'PUAGMAE 2012',
    image: '/PUAGMAE 2012/',
    type: 'photo'
  },
  {
    year: '2011',
    title: 'PUAGMAE 2011',
    image: '/PUAGMAE 2011/',
    type: 'photo'
  }
];

export default function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen pt-24" style={{
      backgroundImage: 'url(/pattern.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="shadow-lg rounded-xl p-6" style={{
          background: 'linear-gradient(to-r, rgba(217, 119, 6, 0.3), rgba(180, 83, 9, 0.3)), linear-gradient(to-r, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">
              PUAGMAE Gallery
            </h1>
            <p className="text-xl text-yellow-200/80 max-w-3xl mx-auto">
              Explore the rich history and memorable moments from PUAGMAE events through the years. 
              Each year brings unique experiences and cultural celebrations.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((item) => (
            <div
              key={item.year}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedYear(selectedYear === item.year ? null : item.year)}
            >
              <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaImages className="text-6xl mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <div className="flex items-center justify-center mt-2">
                      <FaCalendarAlt className="mr-2" />
                      <span className="text-lg">{item.year}</span>
                    </div>
                  </div>
                </div>
                
                {/* Overlay for actual images when available */}
                {item.image && item.image !== '/' && (
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(item.image);
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <FaExpand className="text-white text-3xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-1">Click to explore {item.year} gallery</p>
                  </div>
                  <div className="flex space-x-2">
                    {item.type === 'video' && <FaPlay className="text-blue-500" />}
                    <FaImages className="text-purple-500" />
                  </div>
                </div>
                
                {selectedYear === item.year && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {item.year} was a remarkable year for PUAGMAE. 
                      The event brought together communities and celebrated our shared heritage.
                    </p>
                    <div className="flex space-x-3 mt-3">
                      <Link 
                        href={`/gallery/${item.year}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Photos →
                      </Link>
                      <Link 
                        href={`/gallery/${item.year}/videos`}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Watch Videos →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shadow-lg rounded-xl p-6" style={{
            background: 'linear-gradient(to-r, rgba(217, 119, 6, 0.3), rgba(180, 83, 9, 0.3)), linear-gradient(to-r, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
            backdropFilter: 'blur(8px)'
          }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                Featured Moments
              </h2>
              <p className="text-lg text-yellow-200/80">
                Some of the most memorable highlights from our events
              </p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured items would go here */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Cultural Performances</h3>
              <p className="text-yellow-100">Traditional dances and music that bring our heritage to life</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Community Unity</h3>
              <p className="text-green-100">Bringing together people from all walks of life</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Youth Engagement</h3>
              <p className="text-purple-100">Empowering the next generation through cultural education</p>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Gallery Image"
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
} 