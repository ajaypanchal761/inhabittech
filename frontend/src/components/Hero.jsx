import heroImage from '../assets/images.jpeg'

function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Teal Overlay and Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Hotel lobby"
          className="w-full h-full object-cover"
          style={{ filter: 'blur(2px)' }}
        />
        {/* Dark Teal Overlay with Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br"
          style={{ 
            backgroundImage: 'linear-gradient(to bottom right, rgba(13, 74, 58, 0.75), rgba(13, 74, 58, 0.85))'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        {/* Pill Tag - Hospitality Technology Consultants */}
        <div 
          className="mb-6 md:mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
          style={{ 
            border: '1px solid #0D4A3A',
            backgroundColor: '#E0F7F5'
          }}
        >
          {/* Lightbulb Icon */}
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="#0D4A3A" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span style={{ color: '#0D4A3A' }} className="text-sm font-medium">Hospitality Technology Consultants</span>
        </div>

        {/* Main Heading - Two Lines with Color Split */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 leading-tight">
          <span className="text-white">Expert </span>
          <span style={{ color: '#4ECDC4' }}>Consultation</span>
          <span className="text-white"> for</span>
          <br />
          <span className="text-white">Technology </span>
          <span style={{ color: '#FFD700' }}>Transitions</span>
        </h1>

        {/* Sub-heading/Description */}
        <p className="text-white text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          We guide businesses through technology transformations with expert consultation and seamless transition management. Your trusted advisors for hospitality technology evolution.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          {/* Left Button - Orange with Arrow */}
          <a
            href="#contact"
            style={{ backgroundColor: '#FF6B35' }}
            className="group text-white px-8 py-4 rounded-lg font-medium text-base md:text-lg transition-all duration-200 hover:bg-[#E55A2A] flex items-center gap-2 whitespace-nowrap"
          >
            Start Your Transformation
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Right Button - Transparent with Dark Green Border */}
          <a
            href="#services"
            className="px-8 py-4 rounded-lg font-medium text-base md:text-lg transition-all duration-200 hover:bg-[#0D4A3A]/10 flex items-center gap-2 whitespace-nowrap"
            style={{ 
              color: '#0D4A3A',
              border: '2px solid #0D4A3A'
            }}
          >
            Explore Solutions
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Floating "Talk with Us" Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-black text-white px-4 py-3 rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg hover:bg-gray-800 transition-colors duration-200"
        >
          {/* Headset Icon */}
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Talk with Us</span>
        </button>
      </div>
    </section>
  )
}

export default Hero
