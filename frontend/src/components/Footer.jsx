import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Upper Section - Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Left Column - Company Information */}
          <div>
            {/* Logo */}
            <div className="mb-4 md:mb-6">
              <img 
                src={logo} 
                alt="Inhabit Tech Logo" 
                className="h-24 md:h-28 lg:h-32 xl:h-36 w-auto mb-2"
                style={{ opacity: 1 }}
              />
            </div>

            {/* Description */}
            <p 
              className="text-sm md:text-base mb-6 md:mb-8 leading-relaxed"
              style={{ color: '#1A1A1A' }}
            >
              Expert consultation and transition management for hospitality technology. Guiding hotels through seamless technology evolution with strategic advisory services.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-3 md:gap-4">
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-base md:text-lg border transition-colors hover:bg-gray-100"
                style={{ 
                  backgroundColor: '#F3F4F6',
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB',
                }}
              >
                in
              </a>
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-base md:text-lg border transition-colors hover:bg-gray-100"
                style={{ 
                  backgroundColor: '#F3F4F6',
                  color: '#1A1A1A',
                  borderColor: '#E5E7EB',
                }}
              >
                V
              </a>
            </div>
          </div>

          {/* Middle Column - Consultation Areas */}
          <div>
            <h4 
              className="text-base md:text-lg font-bold mb-4 md:mb-6"
              style={{ color: '#1A1A1A' }}
            >
              Consultation Areas
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {[
                'Hotel Systems Consultation',
                'Network & Connectivity Advisory',
                'Cloud Transition Management',
                'AI Integration Consulting',
                'Cybersecurity Advisory'
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="text-sm md:text-base hover:opacity-70 transition-opacity"
                    style={{ color: '#1A1A1A' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contact Information */}
          <div>
            <h4 
              className="text-base md:text-lg font-bold mb-4 md:mb-6"
              style={{ color: '#1A1A1A' }}
            >
              Contact
            </h4>
            <div className="space-y-3 md:space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3">
                <div style={{ color: '#4ECDC4', flexShrink: 0 }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a 
                  href="mailto:contact@inhabittech.com"
                  className="text-sm md:text-base hover:opacity-70 transition-opacity"
                  style={{ color: '#1A1A1A' }}
                >
                  contact@inhabittech.com
                </a>
              </div>

              {/* Global Reach */}
              <div className="flex items-center gap-3">
                <div style={{ color: '#4ECDC4', flexShrink: 0 }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span 
                  className="text-sm md:text-base"
                  style={{ color: '#1A1A1A' }}
                >
                  15+ Cities Worldwide
                </span>
              </div>

              {/* Support */}
              <div className="flex items-center gap-3">
                <div style={{ color: '#4ECDC4', flexShrink: 0 }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span 
                  className="text-sm md:text-base"
                  style={{ color: '#1A1A1A' }}
                >
                  24/7 Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div 
          className="mb-6 md:mb-8"
          style={{
            height: '1px',
            backgroundColor: '#E5E7EB',
          }}
        />

        {/* Lower Section - Copyright and Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          {/* Copyright */}
          <p 
            className="text-sm md:text-base text-center md:text-left"
            style={{ color: '#1A1A1A' }}
          >
            © 2025 Inhabit Tech. All rights reserved.
          </p>

          {/* Additional Links */}
          <div className="flex items-center gap-2 md:gap-4">
            <a 
              href="#"
              className="text-sm md:text-base hover:opacity-70 transition-opacity"
              style={{ color: '#1A1A1A' }}
            >
              Website Builder
            </a>
            <span 
              className="text-sm md:text-base"
              style={{ color: '#E5E7EB' }}
            >
              |
            </span>
            <span 
              className="text-sm md:text-base"
              style={{ color: '#1A1A1A' }}
            >
              Expert Technology Consultation
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

