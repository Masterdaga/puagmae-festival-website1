'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface GalleryItem {
  image: string;
  type: 'photo' | 'video';
}

const galleryData: GalleryItem[] = [
  { image: '/photos/img1.jpg', type: 'photo' },
  { image: '/photos/img3.jpg', type: 'photo' },
  { image: '/photos/img5.jpg', type: 'photo' },
  { image: '/photos/img6.jpg', type: 'photo' },
  { image: '/photos/img7.jpg', type: 'photo' },
  { image: '/photos/img8.jpg', type: 'photo' },
  { image: '/photos/img9.jpg', type: 'photo' },
  { image: '/photos/img10.jpg', type: 'photo' },
  { image: '/photos/img11.jpg', type: 'photo' },
  { image: '/photos/img12.jpg', type: 'photo' },
  { image: '/photos/img13.jpg', type: 'photo' },
  { image: '/photos/img14.jpg', type: 'photo' },
  { image: '/photos/img15.jpg', type: 'photo' },
  { image: '/photos/img16.jpg', type: 'photo' },
  { image: '/photos/img17.jpg', type: 'photo' },
  { image: '/photos/img18.jpg', type: 'photo' },
  { image: '/photos/img19.jpg', type: 'photo' },
  { image: '/photos/img20.jpg', type: 'photo' },
  { image: '/photos/img21.jpg', type: 'photo' },
  { image: '/photos/img22.jpg', type: 'photo' },
  { image: '/photos/img23.jpg', type: 'photo' },
  { image: '/photos/img24.jpg', type: 'photo' },
  { image: '/photos/img25.jpg', type: 'photo' },
  { image: '/photos/img26.jpg', type: 'photo' },
  { image: '/photos/img28.jpg', type: 'photo' },
  { image: '/videos/vid1.mp4', type: 'video' },
  { image: '/videos/vid2.mp4', type: 'video' },
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState<'photo' | 'video' | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userMutedStates, setUserMutedStates] = useState<boolean[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const photos = [...galleryData.filter(item => item.type === 'photo')].reverse();
  const videos = galleryData.filter(item => item.type === 'video');

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
    setUserMutedStates(Array(videos.length).fill(true));
  }, [videos.length]);

  useEffect(() => {
    const videoInterval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % videos.length);
    }, 30000);

    return () => clearInterval(videoInterval);
  }, [videos.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      
      if (index === currentVideoIndex) {
        video.muted = userMutedStates[index];
        video.play().catch(e => console.log("Autoplay prevented:", e));
      } else {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
    });
  }, [currentVideoIndex, userMutedStates]);

  const handleMuteChange = (index: number, isMuted: boolean) => {
    setUserMutedStates(prev => {
      const newStates = [...prev];
      newStates[index] = isMuted;
      return newStates;
    });
  };

  const openModal = (index: number, type: 'photo' | 'video') => {
    setSelectedIndex(index);
    setMediaType(type);
    setIsModalOpen(true);
    if (type === 'video') {
      setIsPlaying(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
    setIsPlaying(false);
  };

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && mediaType) {
      const items = mediaType === 'photo' ? photos : videos;
      const newIndex = (selectedIndex + 1) % items.length;
      setSelectedIndex(newIndex);
      if (mediaType === 'video') {
        setIsPlaying(true);
      }
    }
  }, [selectedIndex, mediaType, photos, videos]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null && mediaType) {
      const items = mediaType === 'photo' ? photos : videos;
      const newIndex = (selectedIndex - 1 + items.length) % items.length;
      setSelectedIndex(newIndex);
      if (mediaType === 'video') {
        setIsPlaying(true);
      }
    }
  }, [selectedIndex, mediaType, photos, videos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleNext, handlePrev]);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-[#3b2f23] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">PUAGMAE Gallery</h1>
        <div className="text-xl text-yellow-200/80">
          Explore the rich history and memorable moments from PUAGMAE events.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Photos Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 pb-2 border-b border-yellow-400/30">Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((item, index) => (
              <div 
                key={index} 
                className="relative aspect-square w-full cursor-pointer group"
                onClick={() => openModal(index, 'photo')}
              >
                <Image
                  src={item.image}
                  alt={`Gallery Image ${photos.length - index}`}
                  fill
                  className="object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 pb-2 border-b border-yellow-400/30">Videos</h2>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl bg-black/50">
            <div 
              className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentVideoIndex * 100}%)` }}
            >
              {videos.map((item, index) => (
                <div key={index} className="relative min-w-full h-full">
                  <video
                    ref={el => { videoRefs.current[index] = el }}
                    src={item.image}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay={currentVideoIndex === index}
                    muted={currentVideoIndex !== index || userMutedStates[index]}
                    loop
                    onVolumeChange={(e) => 
                      handleMuteChange(index, e.currentTarget.muted)
                    }
                  />
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentVideoIndex === index ? 'bg-yellow-400 w-6' : 'bg-gray-400/70'}`}
                  aria-label={`Go to video ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image/Video Modal */}
      {isModalOpen && selectedIndex !== null && mediaType && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <button
              onClick={handlePrev}
              className="absolute left-0 -translate-x-12 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 translate-x-12 top-1/2 -translate-y-1/2 text-white hover:text-yellow-400 transition-colors z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            
            <div className="w-full h-full flex items-center justify-center">
              {mediaType === 'photo' ? (
                <Image
                  src={photos[selectedIndex].image}
                  alt="Gallery Image"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <video 
                  controls 
                  autoPlay={isPlaying}
                  muted={!isPlaying}
                  className="max-w-full max-h-full rounded-lg"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={videos[selectedIndex].image} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}