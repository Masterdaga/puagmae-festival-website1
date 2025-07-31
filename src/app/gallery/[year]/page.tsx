'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaArrowLeft, FaExpand, FaFilter, FaImages, FaCalendarAlt, FaPlay } from 'react-icons/fa';
import Link from 'next/link';

interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  year: string;
}

export default function YearGalleryPage() {
  const params = useParams();
  const year = params.year as string;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Mock data - in a real app, you'd fetch this from an API
  const mockPhotos: Photo[] = [
    // Cultural Photos
    {
      id: '1',
      src: `/PUAGMAE ${year}/cultural-1.jpg?v=4`,
      alt: `PUAGMAE ${year} Traditional Dance Performance`,
      category: 'cultural',
      year: year
    }
    
    // Add more photos here when you have them:
    // {
    //   id: '2',
    //   src: `/PUAGMAE ${year}/cultural-2.jpg`,
    //   alt: `PUAGMAE ${year} Cultural Exhibition`,
    //   category: 'cultural',
    //   year: year
    // },
    // {
    //   id: '3',
    //   src: `/PUAGMAE ${year}/community-1.jpg`,
    //   alt: `PUAGMAE ${year} Community Gathering`,
    //   category: 'community',
    //   year: year
    // },
    // {
    //   id: '4',
    //   src: `/PUAGMAE ${year}/performance-1.jpg`,
    //   alt: `PUAGMAE ${year} Live Music Performance`,
    //   category: 'performance',
    //   year: year
    // }
  ];

  useEffect(() => {
    setPhotos(mockPhotos);
  }, [year]);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'cultural', name: 'Cultural Events' },
    { id: 'community', name: 'Community' },
    { id: 'performance', name: 'Performances' }
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/gallery"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 border border-yellow-400/30 text-black px-4 py-2 rounded-full font-bold hover:from-yellow-600 hover:to-yellow-400 hover:border-yellow-400 hover:text-black hover:shadow-lg hover:shadow-yellow-400/25 transform transition-all duration-300 flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to Gallery
              </Link>
            </div>
                         <div className="text-center">
               <h1 className="text-4xl font-bold text-yellow-400 mb-2">
                 PUAGMAE {year}
               </h1>
               <p className="text-xl text-yellow-200/80">
                 Relive the memories and moments from {year}
               </p>
             </div>
             <div className="flex items-center space-x-2 text-yellow-400">
               <FaCalendarAlt />
               <span className="font-semibold">{year}</span>
             </div>
          </div>
        </div>
      </div>

             {/* Filter Section */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="rounded-xl shadow-lg p-6" style={{
           background: 'linear-gradient(to-r, rgba(217, 119, 6, 0.3), rgba(180, 83, 9, 0.3)), linear-gradient(to-r, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
           backdropFilter: 'blur(8px)'
         }}>
          <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center space-x-2">
               <FaFilter className="text-yellow-400" />
               <h2 className="text-xl font-semibold text-yellow-400">Filter Photos</h2>
             </div>
             <div className="text-sm text-black font-semibold bg-white/90 px-3 py-1 rounded-full shadow-sm">
               {filteredPhotos.length} photos found
             </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
                             <button
                 key={category.id}
                 onClick={() => setSelectedCategory(category.id)}
                 className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                   selectedCategory === category.id
                     ? 'bg-yellow-500 text-black shadow-lg'
                     : 'bg-black/40 text-yellow-200 hover:bg-black/60 border border-yellow-400/30'
                 }`}
               >
                 {category.name}
               </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openModal(photo.src)}
              >
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-600">
                  <h3 className="font-semibold text-black mb-1">{photo.alt}</h3>
                  <p className="text-sm text-black/80 capitalize">{photo.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaImages className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>

      {/* Navigation to Videos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-8 text-black text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Want to see more from {year}?</h3>
          <p className="text-black/80 mb-6">Explore our video collection featuring performances, ceremonies, and community moments.</p>
          <Link 
            href={`/gallery/${year}/videos`}
            className="inline-flex items-center px-6 py-3 bg-black text-yellow-400 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            <FaPlay className="mr-2" />
            Watch Videos
          </Link>
        </div>
      </div>

      {/* Year Summary */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shadow-lg rounded-xl p-6" style={{
            background: 'linear-gradient(to-r, rgba(217, 119, 6, 0.3), rgba(180, 83, 9, 0.3)), linear-gradient(to-r, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
            backdropFilter: 'blur(8px)'
          }}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                PUAGMAE {year} Highlights
              </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg border border-yellow-400/30">
                <h3 className="text-xl font-semibold mb-2">Cultural Unity</h3>
                <p className="text-yellow-100">Traditional celebrations and cultural performances that brought our community together.</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg border border-yellow-400/30">
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-yellow-100">Building stronger bonds and fostering understanding among diverse communities.</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg border border-yellow-400/30">
                <h3 className="text-xl font-semibold mb-2">Performance</h3>
                <p className="text-yellow-100">Empowering young people to embrace and celebrate their cultural heritage.</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="relative max-w-4xl w-full my-8">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Gallery Image"
              width={800}
              height={600}
              className="rounded-lg w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
} 