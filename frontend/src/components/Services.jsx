import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { serviceAPI } from '../services/api'

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      // Fetch only active services for public display
      const response = await serviceAPI.getAllServices(true)
      if (response.data && response.data.services) {
        const activeServices = response.data.services
        setServices(activeServices)
        // Set first service as active tab
        if (activeServices.length > 0 && !activeTab) {
          setActiveTab(activeServices[0]._id)
        }
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get current service based on active tab
  const currentService = services.find(s => s._id === activeTab) || services[0] || null

  // Render icon from service data or default icon
  const renderIcon = (service, isWhite = false) => {
    if (service?.icon?.url) {
      // If icon is from Cloudinary, display as image
      // Apply white filter when icon should be white (on dark background)
      const filterStyle = isWhite ? { filter: 'brightness(0) invert(1)' } : {};
      return <img src={service.icon.url} alt={service.title} className="w-10 h-10 object-contain" style={filterStyle} />;
    } else if (service?.icon && typeof service.icon === 'string') {
      // Legacy support: if icon is SVG code, render it
      try {
        return <div dangerouslySetInnerHTML={{ __html: service.icon }} className="w-10 h-10" style={isWhite ? { filter: 'brightness(0) invert(1)' } : {}} />;
      } catch {
        // Fallback to default icon
      }
    }
    // Default icon
    return (
      <svg className="w-10 h-10" fill="none" stroke={isWhite ? "white" : "currentColor"} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="pt-24 md:pt-28 lg:pt-32 pb-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Link
              to="/"
              className="text-sm md:text-base flex items-center gap-2"
              style={{ color: '#6B6B6B' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <span
              className="px-3 py-1 rounded-full text-sm md:text-base font-medium flex items-center gap-2"
              style={{
                backgroundColor: '#E0F7F5',
                color: '#1A2B5B'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Detailed Services Overview
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 md:mb-8"
            style={{ color: '#2A7F7F' }}
          >
            Our Technology Services
          </h1>
          <p
            className="text-base md:text-lg lg:text-xl text-center mb-8 md:mb-12 max-w-4xl mx-auto"
            style={{ color: '#6B6B6B' }}
          >
            Comprehensive technology solutions designed specifically for the hospitality industry. Explore our detailed service offerings and see how we can transform your business.
          </p>

          {/* Service Category Navigation */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2A7F7F] border-t-transparent mb-4"></div>
              <p style={{ color: '#6B6B6B' }}>Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: '#6B6B6B' }}>No services available at the moment.</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 md:mb-16">
              {services.map((service) => (
                <button
                  key={service._id}
                  onClick={() => setActiveTab(service._id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-base md:text-lg transition-all duration-200 ${activeTab === service._id
                    ? 'text-white'
                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  style={
                    activeTab === service._id
                      ? { backgroundColor: '#2A7F7F' }
                      : {}
                  }
                >
                  {renderIcon(service, activeTab === service._id)}
                  {service.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Detail Section */}
      {currentService && (
        <section className="py-8 md:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left Side - Visual Card */}
              <div
                className="rounded-xl p-8 md:p-12 h-80 md:h-96 flex flex-col items-start justify-start relative overflow-hidden"
                style={{
                  background: currentService.image?.url
                    ? `url(${currentService.image.url}) center/cover`
                    : 'linear-gradient(to bottom right, #FFFFFF 0%, #E0F7F5 100%)'
                }}
              >
                {currentService.image?.url ? (
                  <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                ) : null}
              </div>

              {/* Right Side - Text Details */}
              <div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8"
                  style={{ color: '#1A1A1A' }}
                >
                  {currentService.title}
                </h2>
                <p
                  className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed"
                  style={{ color: '#6B6B6B' }}
                >
                  {currentService.description}
                </p>

                {/* Key Features */}
                {currentService.keyFeatures && currentService.keyFeatures.length > 0 && (
                  <div className="mb-6 md:mb-8">
                    <h3
                      className="text-lg md:text-xl font-bold mb-4"
                      style={{ color: '#1A1A1A' }}
                    >
                      Key Features
                    </h3>
                    <ul className="space-y-3 md:space-y-4">
                      {currentService.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                            style={{ backgroundColor: '#2A7F7F' }}
                          />
                          <span
                            className="text-base md:text-lg"
                            style={{ color: '#6B6B6B' }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies We Use */}
                {currentService.technologies && currentService.technologies.length > 0 && (
                  <div className="mb-6 md:mb-8">
                    <h3
                      className="text-lg md:text-xl font-bold mb-4"
                      style={{ color: '#1A1A1A' }}
                    >
                      Technologies We Use
                    </h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {currentService.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-lg text-sm md:text-base font-medium border border-gray-200"
                          style={{
                            backgroundColor: '#F8F9FA',
                            color: '#1A1A1A'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Get Started Button */}
                <button
                  className="px-8 py-4 md:px-10 md:py-5 rounded-lg font-medium text-base md:text-lg transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: '#2A7F7F',
                    color: '#FFFFFF'
                  }}
                >
                  Get Started with This Service
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Key Benefits & Implementation Process Section - Side by Side */}
      {currentService && (
        <section className="py-8 md:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Left Section - Key Benefits */}
              {currentService.benefits && currentService.benefits.length > 0 && (
                <div>
                  <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12"
                    style={{ color: '#1A1A1A' }}
                  >
                    Key Benefits
                  </h2>
                  <div className="space-y-4 md:space-y-5">
                    {currentService.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="p-4 md:p-5 rounded-xl flex items-start gap-3 bg-green-100"
                      >
                        <div
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-green-700"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p
                          className="text-sm md:text-base pt-1"
                          style={{ color: '#1A1A1A' }}
                        >
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Right Section - Implementation Process */}
              {currentService.implementationSteps && currentService.implementationSteps.length > 0 && (
                <div>
                  <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12"
                    style={{ color: '#1A1A1A' }}
                  >
                    Implementation Process
                  </h2>
                  <div className="space-y-4 md:space-y-5">
                    {currentService.implementationSteps.map((step, index) => (
                      <div
                        key={index}
                        className="p-4 md:p-5 rounded-xl flex items-start gap-3"
                        style={{
                          backgroundColor: '#F0FDFA',
                          border: '1px solid #E0F7F5'
                        }}
                      >
                        <div
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base text-white"
                          style={{ backgroundColor: '#4ECDC4' }}
                        >
                          {step.number}
                        </div>
                        <p
                          className="text-sm md:text-base font-medium pt-1"
                          style={{ color: '#1A1A1A' }}
                        >
                          {step.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Success Story Section */}
      {currentService && currentService.successStory && (currentService.successStory.client || currentService.successStory.challenge || currentService.successStory.solution || currentService.successStory.results) && (
        <section className="py-8 md:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* White Card with Light Green Tint Background */}
            <div
              className="rounded-xl p-8 md:p-12"
              style={{
                backgroundColor: '#F0FDFA',
                border: '1px solid #E0F7F5'
              }}
            >
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center"
                style={{ color: '#1A1A1A' }}
              >
                Success Story
              </h2>

              {/* Three Column Details - Vertical Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
                {/* Client */}
                {currentService.successStory.client && (
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center flex-shrink-0 mb-4"
                      style={{ backgroundColor: '#2A7F7F' }}
                    >
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p
                      className="text-base md:text-lg font-bold mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Client
                    </p>
                    <p
                      className="text-base md:text-lg"
                      style={{ color: '#6B6B6B' }}
                    >
                      {currentService.successStory.client}
                    </p>
                  </div>
                )}

                {/* Challenge */}
                {currentService.successStory.challenge && (
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center flex-shrink-0 mb-4"
                      style={{ backgroundColor: '#E74C3C' }}
                    >
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p
                      className="text-base md:text-lg font-bold mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Challenge
                    </p>
                    <p
                      className="text-base md:text-lg"
                      style={{ color: '#6B6B6B' }}
                    >
                      {currentService.successStory.challenge}
                    </p>
                  </div>
                )}

                {/* Solution */}
                {currentService.successStory.solution && (
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center flex-shrink-0 mb-4"
                      style={{ backgroundColor: '#4ECDC4' }}
                    >
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M6.343 6.343l-.707.707m12.728 0l-.707.707M6.343 17.657l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p
                      className="text-base md:text-lg font-bold mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Solution
                    </p>
                    <p
                      className="text-base md:text-lg"
                      style={{ color: '#6B6B6B' }}
                    >
                      {currentService.successStory.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Results Bar - Orange Background */}
              {currentService.successStory.results && (
                <div
                  className="rounded-xl p-6 md:p-8 flex items-center gap-4"
                  style={{ backgroundColor: '#FF6B35' }}
                >
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <p className="text-white text-base md:text-lg font-bold">
                    Results: {currentService.successStory.results}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section
        className="py-8 md:py-12 lg:py-16"
        style={{
          background: 'linear-gradient(180deg, #2A7F7F 0%, #1A5F5F 100%)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base md:text-lg text-white mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how hotel systems integration can transform your hospitality business
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button
              className="px-8 py-4 md:px-10 md:py-5 rounded-lg font-medium text-base md:text-lg transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: '#FF6B35',
                color: '#FFFFFF'
              }}
            >
              Schedule Free Consultation
            </button>
            <button
              className="px-8 py-4 md:px-10 md:py-5 rounded-lg font-medium text-base md:text-lg transition-all duration-200 hover:opacity-90 border-2"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#1A1A1A',
                borderColor: '#1A1A1A'
              }}
            >
              Download Service Brochure
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Services

