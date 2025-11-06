import { useState, useEffect } from 'react'
import { serviceAPI, consultationAPI } from '../services/api'

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    message: '',
  })
  const [charCount, setCharCount] = useState(0)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const MAX_CHARS = 500

  // Fetch active services for dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceAPI.getAllServices(true) // Only active services
        if (response.data && response.data.services) {
          setServices(response.data.services)
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchServices()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'message') {
      setCharCount(value.length)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const consultationData = {
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company || '',
        phone: formData.phone || '',
        consultationInterest: formData.interest || null,
        message: formData.message
      }

      await consultationAPI.createConsultation(consultationData)
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        company: '',
        phone: '',
        interest: '',
        message: ''
      })
      setCharCount(0)
      setSubmitted(true)
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (error) {
      alert('Error submitting consultation request: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section 
      className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 overflow-x-hidden w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-4 md:mb-6" style={{ color: '#2dd4bf' }}>
            <span style={{ color: '#2dd4bf' }}>Ready to Transform Your</span>{' '}
            <span style={{ color: '#2dd4bf' }}>Hotel Technology?</span>
          </h2>
          <p className="text-white text-sm md:text-base lg:text-lg max-w-3xl mx-auto px-4">
            Get expert consultation on your technology transition. Our advisors are ready to guide you through every step.
          </p>
        </div>

        {/* Main Content Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Left Box - Get in Touch */}
          <div 
            className="rounded-xl p-6 md:p-8"
            style={{
              backgroundColor: 'rgba(26, 43, 43, 0.8)',
              border: '1px solid rgba(78, 205, 196, 0.3)',
            }}
          >
            <h3 
              className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 md:mb-6 lg:mb-8"
              style={{ color: '#4ECDC4' }}
            >
              Get in Touch
            </h3>

            {/* Contact Details */}
            <div className="space-y-3 md:space-y-4 lg:space-y-6 mb-4 md:mb-6 lg:mb-8">
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
                className="text-lg md:text-xl lg:text-2xl font-extrabold mb-4 md:mb-6"
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
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Full Name Field */}
              <div>
                <label 
                  htmlFor="fullName"
                  className="block text-white text-sm md:text-base mb-2"
                >
                  Full Name <span style={{ color: '#E74C3C' }}>*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
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
                  Email Address <span style={{ color: '#E74C3C' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all"
                  style={{
                    backgroundColor: 'rgba(42, 74, 74, 0.6)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                  required
                />
              </div>

              {/* Company Field */}
              <div>
                <label 
                  htmlFor="company"
                  className="block text-white text-sm md:text-base mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your hotel/company name"
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all"
                  style={{
                    backgroundColor: 'rgba(42, 74, 74, 0.6)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label 
                  htmlFor="phone"
                  className="block text-white text-sm md:text-base mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all"
                  style={{
                    backgroundColor: 'rgba(42, 74, 74, 0.6)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                />
              </div>

              {/* Consultation Interest Field */}
              <div>
                <label 
                  htmlFor="interest"
                  className="block text-white text-sm md:text-base mb-2"
                >
                  Consultation Interest
                </label>
                <div className="relative">
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all appearance-none pr-10"
                    style={{
                      backgroundColor: 'rgba(42, 74, 74, 0.6)',
                      border: '1px solid rgba(78, 205, 196, 0.3)',
                    }}
                  >
                    <option value="" style={{ backgroundColor: '#2A4A4A', color: '#9CA3AF' }}>Select consultation area</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id} style={{ backgroundColor: '#2A4A4A', color: '#FFFFFF' }}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {/* Dropdown Arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label 
                  htmlFor="message"
                  className="block text-white text-sm md:text-base mb-2"
                >
                  Message <span style={{ color: '#E74C3C' }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your technology transition needs and consultation requirements...."
                  rows={5}
                  maxLength={MAX_CHARS}
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all resize-none"
                  style={{
                    backgroundColor: 'rgba(42, 74, 74, 0.6)',
                    border: '1px solid rgba(78, 205, 196, 0.3)',
                  }}
                  required
                />
                <p className="text-right text-sm mt-1" style={{ color: '#9CA3AF' }}>
                  {charCount}/{MAX_CHARS} characters
                </p>
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="p-4 rounded-lg text-white text-sm md:text-base" style={{ backgroundColor: '#10B981' }}>
                  Thank you! Your consultation request has been submitted successfully. We'll get back to you within 24 hours.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 rounded-lg font-medium text-white text-base md:text-lg transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#FF6B35' }}
              >
                {loading ? 'Submitting...' : 'Get Consultation'} <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm

