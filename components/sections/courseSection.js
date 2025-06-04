"use client"
import { useState, useEffect } from 'react';
import Courses from './courseData'; // Import the course data

const CourseSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCourseClick = (course) => {
    if (course.videos?.length > 0) {
      setSelectedCourse(course);
      setSelectedVideo(course.videos[0]);
    }
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setSelectedVideo(null);
  };

  return (
    <div className="container mx-auto px-4 py-16 font-sans">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1 mb-4 rounded-full bg-green-50 text-green-700">
          Expert Tutoring
        </span>
        <h2 className="text-4xl font-bold mb-4 tracking-tight text-gray-900">
          Specialized Subject Tutoring
        </h2>
        <p className="text-lg leading-relaxed text-gray-500">
          Precision learning with PhD-level tutors. 92% success rate in grade improvement across all subjects.
        </p>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Courses.map((course) => (
          <div 
            key={course.id}
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              hoveredCard === course.id ? 'shadow-lg' : 'shadow-sm'
            } cursor-pointer ${
              hoveredCard === course.id ? 'bg-green-50' : 'bg-white'
            } border-gray-200 ${
              hoveredCard === course.id ? 'translate-y-[-4px]' : ''
            }`}
            onMouseEnter={() => setHoveredCard(course.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCourseClick(course)}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Subject Tag */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold tracking-wider px-2 py-1 rounded bg-gray-100 text-gray-600">
                  {course.subject}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700">
                  {course.level}
                </span>
              </div>
              
              {/* Course Title */}
              <h3 className="text-xl font-bold mb-3 leading-snug text-gray-900">
                {course.title}
                {course.tutor && (
                  <span className="block text-sm font-normal mt-1">by {course.tutor}</span>
                )}
              </h3>
              
              {/* Highlight */}
              <div className="flex items-center mb-4">
                <div className="w-1.5 h-1.5 rounded-full mr-2 bg-green-600"></div>
                <span className="text-xs font-medium text-gray-500">{course.highlight}</span>
              </div>
              
              {/* Description */}
              <p className="text-sm mb-6 leading-relaxed flex-grow text-gray-500">
                {course.description}
              </p>
              
              {/* Footer */}
              <div className="mt-auto">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">{course.duration}</span>
                  <button 
                    className="px-4 py-2 rounded-md text-sm font-semibold transition-colors min-w-[100px]"
                    style={{ 
                      backgroundColor: hoveredCard === course.id ? '#067a56' : '#079768',
                      color: 'white'
                    }}
                    onClick={() => handleCourseClick(course)}
                  >
                    {course.videos?.length > 0 ? 'Watch Videos' : 'Book Session'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedCourse && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="p-6 pb-0 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedCourse.title}
                  {selectedCourse.tutor && (
                    <span className="block text-sm font-normal mt-1">by {selectedCourse.tutor}</span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCourse.videos.length} video lessons
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
              {/* Video Player */}
              <div className="w-full md:w-2/3 p-6 pt-2">
                <div className="relative pb-[56.25%] bg-black rounded-lg overflow-hidden">
                  {isClient && (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  )}
                </div>
                <h4 className="text-lg font-semibold mt-4 px-2 text-gray-900">
                  {selectedVideo.title}
                </h4>
              </div>

              {/* Video List */}
              <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto">
                <div className="p-4">
                  <h4 className="font-semibold mb-3 text-gray-800">Course Videos</h4>
                  <div className="space-y-2">
                    {selectedCourse.videos.map((video) => (
                      <div
                        key={video.id}
                        className={`p-3 rounded-lg cursor-pointer flex items-start ${
                          selectedVideo.id === video.id
                            ? 'bg-green-50 border border-green-200'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="relative w-16 h-10 flex-shrink-0 mr-3 rounded overflow-hidden">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-medium truncate ${
                              selectedVideo.id === video.id
                                ? 'text-green-700'
                                : 'text-gray-800'
                            }`}
                          >
                            {video.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Click to play</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-16">
        <button
          className="px-8 py-3 rounded-md font-semibold border-2 border-green-600 text-green-600 bg-transparent transition-all hover:shadow-sm"
        >
          Browse All Subjects →
        </button>
      </div>
    </div>
  );
};

export default CourseSection;