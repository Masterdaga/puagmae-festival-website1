export default function GalleryLoading() {
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-[#3b2f23] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        
        <div className="text-4xl font-bold text-yellow-400 mb-4 animate-pulse">
          <div className="h-10 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
        </div>

        
        <div className="text-xl text-yellow-200/80 mb-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-lg max-w-3xl mx-auto animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 animate-pulse">Photos</h2>
        <div className="flex flex-wrap justify-center">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="relative h-64 w-1/4 cursor-pointer transition-transform duration-300 hover:scale-105 m-2 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-yellow-400 mb-4 mt-12 animate-pulse">Videos</h2>
        <div className="flex flex-wrap justify-center">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="relative h-64 w-1/4 cursor-pointer transition-transform duration-300 hover:scale-105 m-2 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Featured Section Skeleton */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-32 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
