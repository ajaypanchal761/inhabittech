import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    requirements: '',
  })
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'requirements') {
      setCharCount(value.length)
    }
  }

  return (
    <section 
      className="py-16 md:py-24"
      style={{
        background: 'linear-gradient(to bottom, #1A2B2B 0%, #2A4A4A 100%)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span style={{ color: '#4ECDC4' }}>Ready to Transform Your</span>{' '}
            <span style={{ color: '#FF6B35' }}>Hotel Technology?</span>
          </h2>
          <p className="text-white text-base md:text-lg max-w-3xl mx-auto">
            Get expert consultation on your technology transition. Our advisors are ready to guide you through every step.
          </p>
        </div>

        {/* Main Content Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Box - Get in Touch */}
          <div 
            className="rounded-xl p-6 md:p-8"
            style={{
              backgroundColor: 'rgba(26, 43, 43, 0.8)',
              border: '1px solid rgba(78, 205, 196, 0.3)',
            }}
          >
            <h3 
              className="text-2xl md:text-3xl font-bold mb-6 md:mb-8"
              style={{ color: '#4ECDC4' }}
            >
              Get in Touch
            </h3>

            {/* Contact Details */}
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              {/* Email */}
              <div className="flex items-start gap-3">
                <div style={{ color: '#4ECDC4', fontSize: '20px', marginTop: '2px' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm md:text-base mb-1">Email</p>
                  <p className="text-white font-bold text-base md:text-lg">contact@inhabittech.com</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start gap-3">
                <div style={{ color: '#4ECDC4', fontSize: '20px', marginTop: '2px' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm md:text-base mb-1">Response Time</p>
                  <p className="text-white font-bold text-base md:text-lg">Within 24 hours</p>
                </div>
              </div>

              {/* Global Reach */}
              <div className="flex items-start gap-3">
                <div style={{ color: '#4ECDC4', fontSize: '20px', marginTop: '2px' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm md:text-base mb-1">Global Reach</p>
                  <p className="text-white font-bold text-base md:text-lg">15+ Cities Worldwide</p>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div 
              className="mb-6 md:mb-8"
              style={{
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />

            {/* Why Choose Our Consultation */}
            <div>
              <h4 
                className="text-xl md:text-2xl font-bold mb-4 md:mb-6"
                style={{ color: '#4ECDC4' }}
              >
                Why Choose Our Consultation?
              </h4>
              <ul className="space-y-3 md:space-y-4">
                {[
                  'Expert technology advisors',
                  'Proven transition methodology',
                  'Risk-free consultation approach',
                  'Ongoing support & guidance'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: '#4ECDC4' }}
                    />
                    <span className="text-white text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Box - Consultation Form */}
          <div 
            className="rounded-xl p-6 md:p-8"
            style={{
              backgroundColor: 'rgba(26, 43, 43, 0.8)',
              border: '1px solid rgba(78, 205, 196, 0.3)',
            }}
          >
            <form className="space-y-4 md:space-y-6">
              {/* Full Name Field */}
              <div>
                <label 
                  htmlFor="fullName"
                  className="block text-white text-sm md:text-base mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all"
                  style={{
                    backgroundColor: 'rgba(42, 74, 74, 0.6)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                  required
                />
              </div>

              {/* Email Address Field */}
              <div>
                <label 
                  htmlFor="email"
                  className="block text-white text-sm md:text-base mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all"
                  style={{
                    backgroundColor: 'rgba(42, 74, 74, 0.6)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                  required
                />
              </div>

              {/* Consultation Requirements Field */}
              <div>
                <label 
                  htmlFor="requirements"
                  className="block text-white text-sm md:text-base mb-2"
                >
                  Consultation Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Tell us about your technology transition needs..."
                  rows={5}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all resize-none"
                  style={{
                    backgroundColor: 'rgba(42, 74, 74, 0.6)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                  required
                />
                <div className="flex justify-end mt-2">
                  <span 
                    className="text-sm"
                    style={{ color: '#9CA3AF' }}
                  >
                    {charCount}/500
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-4 rounded-lg font-medium text-white text-base md:text-lg transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#FF6B35' }}
              >
                Get Consultation <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm

