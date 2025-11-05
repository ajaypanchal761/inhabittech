import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import image1 from '../assets/images (1).jpeg'
import image2 from '../assets/images (2).jpeg'
import image3 from '../assets/images (3).jpeg'
import image4 from '../assets/images (4).jpeg'
import image5 from '../assets/images (5).jpeg'
import image6 from '../assets/images (6).jpeg'
import images from '../assets/images.jpeg'
import download from '../assets/download.jpeg'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // All available images
  const allImages = [image1, image2, image3, image4, image5, image6, images, download]

  // Project data
  const projects = {
    1: {
      title: 'One Berkeley Street - Café',
      client: 'Crosstree Real Estate Partners LLP',
      category: 'Hospitality Technology',
      solutionType: 'Boutique Hotel Automation | Guest Experience Platform',
      description: 'Revolutionary smart hotel implementation for One Berkeley Street featuring AI-powered guest services, automated room controls, and personalized experience platform that sets new standards for boutique hospitality.',
      technologies: ['AI Guest Services', 'Smart Room Controls', 'Digital Concierge', 'Automated Check-in', 'Personalization Engine'],
      location: 'London, UK',
      completionYear: '2024',
      projectType: 'Hospitality Technology',
      status: 'Live & Operational',
      challenges: ['Manual guest services', 'Inconsistent room experiences', 'Limited personalization', 'Operational inefficiencies'],
      solutions: ['AI-powered concierge system', 'Automated room environment controls', 'Personalized guest profiles', 'Streamlined operations platform']
    },
    2: {
      title: 'Broadwick Soho',
      client: 'Broadwick Street Holdings Limited',
      category: 'Smart Hotel Solutions',
      solutionType: 'Boutique Hotel Automation | Guest Experience Platform',
      description: 'Revolutionary smart hotel implementation for Broadwick Soho featuring AI-powered guest services, automated room controls, and personalized experience platform that sets new standards for boutique hospitality.',
      technologies: ['AI Guest Services', 'Smart Room Controls', 'Digital Concierge', 'Automated Check-in', 'Personalization Engine'],
      location: 'London, UK',
      completionYear: '2024',
      projectType: 'Smart Hotel Solutions',
      status: 'Live & Operational',
      challenges: ['Manual guest services', 'Inconsistent room experiences', 'Limited personalization', 'Operational inefficiencies'],
      solutions: ['AI-powered concierge system', 'Automated room environment controls', 'Personalized guest profiles', 'Streamlined operations platform']
    },
    // Add more projects as needed
  }

  const project = projects[id] || projects[2] // Default to project 2 if not found

  // Carousel images - use 4 images from allImages
  const carouselImages = allImages.slice(0, 4)

  useEffect(() => {
    let interval = null
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, carouselImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: '#1A2B5B' }}
    >
      <Header />
      {/* Top Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white hover:opacity-70 transition-opacity mb-6 md:mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-base md:text-lg">Back to Projects</span>
        </button>

        {/* Project Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 flex-wrap">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
              {project.title}
            </h1>
            <div 
              className="px-3 py-1 md:px-4 md:py-2 rounded-lg text-white text-sm md:text-base font-medium"
              style={{ backgroundColor: '#4ECDC4' }}
            >
              Completed
            </div>
          </div>
          <p 
            className="text-base md:text-lg mb-2"
            style={{ color: '#4ECDC4' }}
          >
            {project.client}
          </p>
          <p 
            className="text-base md:text-lg mb-2"
            style={{ color: '#4ECDC4' }}
          >
            {project.category}
          </p>
          <p className="text-white text-base md:text-lg mb-4 md:mb-6">
            {project.solutionType}
          </p>
          <p className="text-white text-base md:text-lg max-w-4xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Image Carousel Section */}
        <div className="mb-12 md:mb-16">
          {/* Main Image */}
          <div className="relative mb-4 md:mb-6 rounded-xl overflow-hidden">
            <img
              src={carouselImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />
            
            {/* Navigation Controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition-all text-white"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition-all text-white"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div 
              className="absolute top-4 right-4 px-3 py-2 rounded-lg text-white text-sm md:text-base font-medium"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
              {currentImageIndex + 1}/{carouselImages.length}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition-all text-white"
            >
              {isPlaying ? (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-2 md:gap-3">
            {carouselImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative rounded-lg overflow-hidden flex-shrink-0 ${
                  index === currentImageIndex ? 'ring-2 ring-[#4ECDC4]' : 'opacity-70 hover:opacity-100'
                } transition-all`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Project Details Sections - Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Column 1: Technologies Implemented */}
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 md:mb-6">
              Technologies Implemented
            </h2>
            <div className="space-y-3 md:space-y-4">
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="rounded-lg p-4 md:p-5"
                  style={{ backgroundColor: '#2A4080' }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#4ECDC4' }}
                    />
                    <span className="text-white text-sm md:text-base">{tech}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Project Information */}
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 md:mb-6">
              Project Information
            </h2>
            <div className="space-y-3 md:space-y-4">
              {[
                { label: 'Location', value: project.location },
                { label: 'Completion Year', value: project.completionYear },
                { label: 'Project Type', value: project.projectType },
                { label: 'Project Status', value: project.status, isStatus: true }
              ].map((info, index) => (
                <div
                  key={index}
                  className="rounded-lg p-4 md:p-5"
                  style={{ backgroundColor: '#2A4080' }}
                >
                  <div className="flex items-center gap-3">
                    {info.isStatus ? (
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#4ECDC4' }}
                      />
                    ) : null}
                    <div>
                      <p 
                        className="text-sm md:text-base mb-1"
                        style={{ color: '#4ECDC4' }}
                      >
                        {info.label}:
                      </p>
                      <p className="text-white text-sm md:text-base font-medium">{info.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Challenges & Solutions */}
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4 md:mb-6">
              Challenges & Solutions
            </h2>
            <div className="space-y-4 md:space-y-6">
              {/* Key Challenges Box */}
              <div
                className="rounded-lg p-4 md:p-5 border-2"
                style={{ 
                  backgroundColor: '#2A4080',
                  borderColor: '#E74C3C'
                }}
              >
                <h3 
                  className="text-lg md:text-xl font-extrabold mb-3 md:mb-4"
                  style={{ color: '#FF6B6B' }}
                >
                  Key Challenges
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: '#E74C3C' }}
                      />
                      <span className="text-white text-sm md:text-base">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Solutions Box */}
              <div
                className="rounded-lg p-4 md:p-5 border-2"
                style={{ 
                  backgroundColor: '#2A4080',
                  borderColor: '#4ECDC4'
                }}
              >
                <h3 
                  className="text-lg md:text-xl font-extrabold mb-3 md:mb-4"
                  style={{ color: '#4ECDC4' }}
                >
                  Our Solutions
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {project.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: '#4ECDC4' }}
                      />
                      <span className="text-white text-sm md:text-base">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div
          className="rounded-xl p-6 md:p-8 text-center pb-8 md:pb-10 mb-12 md:mb-16"
          style={{ backgroundColor: '#1e40af' }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 md:mb-4">
            Interested in Similar Solutions?
          </h2>
          <p className="text-white text-base md:text-lg mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how we can transform your hospitality business with innovative technology solutions like we did for {project.client}.
          </p>
          <button
            className="px-8 py-3 md:px-10 md:py-4 rounded-lg font-medium text-base md:text-lg transition-all duration-200 hover:opacity-90"
            style={{ 
              backgroundColor: '#FFFFFF',
              color: '#1A2B5B'
            }}
          >
            Start Your Project
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail

