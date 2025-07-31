'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaPlay, FaCalendarAlt, FaVideo, FaFilter } from 'react-icons/fa';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  category: string;
  year: string;
}

export default function VideoGalleryPage() {
  const params = useParams();
  const year = params.year as string;
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [videos, setVideos] = useState<Video[]>([]);

  // Mock data - in a real app, you'd fetch this from an API
  const mockVideos: Video[] = [
    {
      id: '1',
      title: `PUAGMAE ${year} Opening Ceremony`,
      description: 'The grand opening ceremony that kicked off the PUAGMAE event with traditional performances and speeches.',
      thumbnail: `/PUAGMAE ${year}/opening-ceremony.jpg`,
      videoUrl: `/PUAGMAE ${year}/videos/opening-ceremony1.mp4`,
      duration: '15:30',
      category: 'ceremony',
      year: year
    },
    {
      id: '2',
      title: `PUAGMAE ${year} Cultural Performances`,
      description: 'Traditional dances and music performances showcasing our rich cultural heritage.',
      thumbnail: `/PUAGMAE ${year}/cultural-performance.jpg`,
      videoUrl: `/PUAGMAE ${year}/videos/cultural-performance.mp4`,
      duration: '22:15',
      category: 'performance',
      year: year
    },
    {
      id: '3',
      title: `PUAGMAE ${year} Community Highlights`,
      description: 'Moments of unity and celebration as communities came together.',
      thumbnail: `/PUAGMAE ${year}/community-highlights.jpg`,
      videoUrl: `/PUAGMAE ${year}/videos/community-highlights.mp4`,
      duration: '18:45',
      category: 'community',
      year: year
    }
  ];

  useEffect(() => {
    setVideos(mockVideos);
  }, [year]);

  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'ceremony', name: 'Ceremonies' },
    { id: 'performance', name: 'Performances' },
    { id: 'community', name: 'Community' }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
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
                href={`/gallery/${year}`}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 border border-yellow-400/30 text-black px-4 py-2 rounded-full font-bold hover:from-yellow-600 hover:to-yellow-400 hover:border-yellow-400 hover:text-black hover:shadow-lg hover:shadow-yellow-400/25 transform transition-all duration-300 flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to {year} Gallery
              </Link>
            </div>
                         <div className="text-center">
               <h1 className="text-4xl font-bold text-yellow-400 mb-2">
                 PUAGMAE {year} Videos
               </h1>
               <p className="text-xl text-yellow-200/80">
                 Watch the highlights and memorable moments from {year}
               </p>
             </div>
             <div className="flex items-center space-x-2 text-yellow-400">
               <FaVideo />
               <span className="font-semibold">Videos</span>
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
               <h2 className="text-xl font-semibold text-yellow-400">Filter Videos</h2>
             </div>
             <div className="text-sm text-black font-semibold bg-white/90 px-3 py-1 rounded-full shadow-sm">
               {filteredVideos.length} videos found
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

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openVideo(video)}
              >
                <div className="relative h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden">
                  {/* Video thumbnail */}
                  <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <div className="text-center text-black">
                      <FaVideo className="text-5xl mb-3" />
                      <p className="text-lg font-bold">{video.title.split(' ').slice(-2).join(' ')}</p>
                      <p className="text-sm opacity-80">Click to play</p>
                    </div>
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <FaPlay className="text-blue-600 text-xl ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-yellow-400 to-yellow-600">
                  <h3 className="font-semibold text-black mb-2 text-lg">{video.title}</h3>
                  <p className="text-black/80 text-sm mb-3 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-black/70 capitalize">{video.category}</span>
                    <div className="flex items-center space-x-2 text-black/70">
                      <FaCalendarAlt className="text-xs" />
                      <span className="text-xs">{video.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FaVideo className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No videos found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>

      {/* Video Summary */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shadow-lg rounded-xl p-6" style={{
            background: 'linear-gradient(to-r, rgba(217, 119, 6, 0.3), rgba(180, 83, 9, 0.3)), linear-gradient(to-r, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
            backdropFilter: 'blur(8px)'
          }}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                PUAGMAE {year} Video Collection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaVideo className="text-2xl text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Opening Ceremonies</h3>
                  <p className="text-yellow-200/80">Grand opening events and traditional ceremonies that set the tone for each year.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaPlay className="text-2xl text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Cultural Performances</h3>
                  <p className="text-yellow-200/80">Traditional dances, music, and performances that showcase our rich heritage.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaVideo className="text-2xl text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Community Moments</h3>
                  <p className="text-yellow-200/80">Heartwarming moments of unity and celebration among community members.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-4">{selectedVideo.title}</h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  src={selectedVideo.videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-black/80 mt-4">{selectedVideo.description}</p>
              <div className="flex items-center justify-between mt-4 text-sm text-black/70">
                <span>Duration: {selectedVideo.duration}</span>
                <span>Category: {selectedVideo.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 