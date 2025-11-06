function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Top Section: About Inhabit Tech */}
        <div className="text-center mb-8 md:mb-12">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
            <span className="text-[#1A1A1A]">About</span>{' '}
            <span style={{ color: '#20C997' }}>Inhabit Tech</span>
          </h2>

          {/* Body Paragraph */}
          <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
            Inhabit Tech is a next-generation Hospitality Technology Company transforming the way hotels integrate digital systems. We deliver smart automation, seamless connectivity, and intuitive digital experiences to global hospitality brands.
          </p>

          {/* Quoted Tagline */}
          <p 
            className="text-lg md:text-xl italic mb-6 md:mb-8 max-w-3xl mx-auto"
            style={{ color: '#20C997' }}
          >
            "Bridging technology and hospitality — from intelligent networks to guest-centric systems."
          </p>

          {/* Small Tag/Button */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ 
              backgroundColor: '#E0F7F5',
              border: '1px solid #E0F7F5'
            }}
          >
            {/* Icon - House with Wi-Fi symbol */}
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#4A4A4A" 
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
              <circle cx="12" cy="8" r="1" fill="#4A4A4A" />
              <path d="M12 8v4" />
            </svg>
            <span className="text-[#4A4A4A] text-sm font-medium">About Inhabit Tech</span>
          </div>
        </div>

        {/* Middle Section: Your Technology Transition Partners */}
        <div className="mb-16 md:mb-20">
          {/* Main Heading */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8">
            <span className="text-[#1A1A1A]">Your Technology</span>{' '}
            <span style={{ color: '#20C997' }}>Transition Partners</span>
          </h3>

          {/* Body Paragraph */}
          <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed mb-12 md:mb-16 max-w-4xl mx-auto text-center">
            Inhabit Tech specializes in guiding hospitality businesses through complex technology transitions. We provide expert consultation and comprehensive transition management to ensure your hotel's technology evolution is smooth, strategic, and successful.
          </p>

          {/* Four Service Blocks - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Top-Left: Strategic Assessment */}
            <div className="bg-transparent p-6 md:p-8 text-center">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto"
                style={{ backgroundColor: '#E0F7F5' }}
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="#4A4A4A" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h.01M12 12h.01M15 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3">
                Strategic Assessment
              </h4>
              <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed">
                Comprehensive evaluation of your current technology landscape and future needs
              </p>
            </div>

            {/* Top-Right: Transition Planning */}
            <div className="bg-transparent p-6 md:p-8 text-center">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto"
                style={{ backgroundColor: '#E0F7F5' }}
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="#4A4A4A" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3">
                Transition Planning
              </h4>
              <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed">
                Detailed roadmaps and timelines for seamless technology transformations
              </p>
            </div>

            {/* Bottom-Left: Change Management */}
            <div className="bg-transparent p-6 md:p-8 text-center">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto"
                style={{ backgroundColor: '#E0F7F5' }}
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="#4A4A4A" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3">
                Change Management
              </h4>
              <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed">
                Expert guidance through organizational and operational changes
              </p>
            </div>

            {/* Bottom-Right: Risk Mitigation */}
            <div className="bg-transparent p-6 md:p-8 text-center">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto"
                style={{ backgroundColor: '#E0F7F5' }}
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke="#4A4A4A" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3">
                Risk Mitigation
              </h4>
              <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed">
                Proactive identification and management of transition risks
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Concluding Tagline */}
        <div className="text-center">
          <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-4xl mx-auto">
            We believe technology should feel invisible — enhancing every guest experience while empowering every hotel team.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About

