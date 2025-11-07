import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import heroImage from '../assets/images.jpeg'
import { serviceAPI, consultationAPI } from '../services/api'

function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    message: ''
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

  const faqs = [
    {
      question: "How long does a typical consultation take?",
      answer: "Our initial consultation typically lasts 60-90 minutes. This allows us to thoroughly understand your current technology landscape, identify pain points, and discuss your goals. Follow-up consultations are scheduled based on your specific needs and project complexity."
    },
    {
      question: "Do you provide ongoing advisory support?",
      answer: "Yes, we offer ongoing advisory support packages tailored to your needs. Whether you need monthly check-ins, quarterly reviews, or dedicated support during critical transitions, we're here to guide you through every step of your technology journey."
    },
    {
      question: "Can you work with our existing technology partners?",
      answer: "Absolutely. We specialize in integrating with existing technology ecosystems and work seamlessly with your current vendors. Our goal is to ensure all systems work together harmoniously, not to replace what's already working well for you."
    },
    {
      question: "What is your consultation fee structure?",
      answer: "Our consultation fees are structured based on the scope and complexity of your project. We offer both hourly rates and project-based packages. Contact us for a detailed quote tailored to your specific needs and requirements."
    },
    {
      question: "Do you provide training during transitions?",
      answer: "Yes, comprehensive training is a core part of our transition management services. We provide hands-on training for your staff, detailed documentation, and ongoing support to ensure your team is confident and comfortable with new systems."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Intro Section */}
      <section className="pt-24 md:pt-28 lg:pt-32 pb-14 md:pb-18 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D4A3A 0%, #1E6F5C 55%, #10918B 100%)' }}>
        <div className="absolute -top-24 right-0 w-56 h-56 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-[#4ECDC4]/20 blur-3xl" aria-hidden="true" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-white text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-sm md:text-base font-medium px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <span className="px-4 py-2 rounded-full text-sm md:text-base font-medium bg-white/20">
              Get In Touch
            </span>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide bg-white/15">
            Let’s Build Connected Experiences
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mt-4 mb-6">
            Together, We Design Technology That Works Hard and Feels Effortless
          </h1>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/85 max-w-3xl mx-auto mb-6">
            From back-of-house infrastructure to guest-facing technology, we help you create spaces that work smarter and feel better.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white/85 max-w-3xl mx-auto">
            Get in touch with the Inhabit Tech team to discuss your next project — and discover how we can help bring your vision to life. To get in touch, please visit our Contact Us page, where you’ll find all of our contact details.
          </p>
        </div>
      </section>

      {/* Hero Section with Background Image */}
      <section className="pb-16 md:pb-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            opacity: 0.5
          }}
        ></div>
        <div className="absolute inset-0 bg-white bg-opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 md:mb-8"
              style={{ color: '#1A2B5B' }}
            >
              Get Expert Consultation
            </h2>
            <p 
              className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: '#1A1A1A' }}
            >
              Ready to transform your hotel's technology? We're here to guide you through every step of your transition. Schedule a consultation with our technology advisors.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area - Form & Contact Details */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* White Card Container */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              {/* Left Column - Request a consultation Form */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8"
                  style={{ color: '#1A1A1A' }}
                >
                  Request a consultation
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label 
                      htmlFor="fullName" 
                      className="block text-sm md:text-base font-medium mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Full Name <span style={{ color: '#E74C3C' }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2A7F7F] focus:border-[#2A7F7F] outline-none transition-all"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm md:text-base font-medium mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Email Address <span style={{ color: '#E74C3C' }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2A7F7F] focus:border-[#2A7F7F] outline-none transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label 
                      htmlFor="company" 
                      className="block text-sm md:text-base font-medium mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2A7F7F] focus:border-[#2A7F7F] outline-none transition-all"
                      placeholder="Your hotel/company name"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label 
                      htmlFor="phone" 
                      className="block text-sm md:text-base font-medium mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2A7F7F] focus:border-[#2A7F7F] outline-none transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Consultation Interest */}
                  <div>
                    <label 
                      htmlFor="interest" 
                      className="block text-sm md:text-base font-medium mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Consultation Interest
                    </label>
                    <div className="relative">
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2A7F7F] focus:border-[#2A7F7F] outline-none transition-all appearance-none bg-white pr-10"
                      >
                        <option value="">Select consultation area</option>
                        {services.map((service) => (
                          <option key={service._id} value={service._id}>
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

                  {/* Message */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-sm md:text-base font-medium mb-2"
                      style={{ color: '#1A1A1A' }}
                    >
                      Message <span style={{ color: '#E74C3C' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      maxLength={MAX_CHARS}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2A7F7F] focus:border-[#2A7F7F] outline-none transition-all resize-none"
                      placeholder="Tell us about your technology transition needs and consultation requirements...."
                      required
                    ></textarea>
                    <p className="text-right text-sm mt-1" style={{ color: '#9CA3AF' }}>
                      {charCount}/{MAX_CHARS} characters
                    </p>
                  </div>

                  {/* Success Message */}
                  {submitted && (
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <p className="text-green-800 text-sm md:text-base">
                        Thank you! Your consultation request has been submitted successfully. We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 rounded-lg font-medium text-base md:text-lg text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: '#2A7F7F',
                      color: '#FFFFFF'
                    }}
                  >
                    {loading ? 'Submitting...' : 'Request Consultation'}
                  </button>
                </form>
              </div>

              {/* Right Column - Schedule a consultation Details */}
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6"
                  style={{ color: '#1A1A1A' }}
                >
                  Schedule a consultation
                </h2>
                <p 
                  className="text-base md:text-lg mb-8 md:mb-10 leading-relaxed"
                  style={{ color: '#1A1A1A' }}
                >
                  We're here to help you navigate your hotel's technology transformation. Reach out through any of these channels for expert consultation and guidance.
                </p>

                {/* Contact Methods */}
                <div className="space-y-6 md:space-y-8 mb-8 md:mb-10">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#E0F7F5' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="#2A7F7F" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p 
                        className="text-base md:text-lg font-medium mb-1"
                        style={{ color: '#1A1A1A' }}
                      >
                        +1 (555) 123-4567
                      </p>
                      <p 
                        className="text-sm md:text-base"
                        style={{ color: '#6B6B6B' }}
                      >
                        Mon-Fri 9AM-6PM EST
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#E0F7F5' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="#2A7F7F" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p 
                        className="text-base md:text-lg font-medium mb-1"
                        style={{ color: '#1A1A1A' }}
                      >
                        hello@hoteltech.com
                      </p>
                      <p 
                        className="text-sm md:text-base"
                        style={{ color: '#6B6B6B' }}
                      >
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {/* Office */}
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#E0F7F5' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="#2A7F7F" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p 
                        className="text-base md:text-lg font-medium mb-1"
                        style={{ color: '#1A1A1A' }}
                      >
                        123 Tech Street, San Francisco, CA 94105
                      </p>
                      <p 
                        className="text-sm md:text-base"
                        style={{ color: '#6B6B6B' }}
                      >
                        Visit us by appointment
                      </p>
                    </div>
                  </div>

                  {/* Support */}
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#E0F7F5' }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="#2A7F7F" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p 
                        className="text-base md:text-lg font-medium mb-1"
                        style={{ color: '#1A1A1A' }}
                      >
                        24/7 Emergency Support
                      </p>
                      <p 
                        className="text-sm md:text-base"
                        style={{ color: '#6B6B6B' }}
                      >
                        For existing clients
                      </p>
                    </div>
                  </div>
                </div>

                {/* Embedded Map */}
                <div className="mt-8 md:mt-10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509038!2d-122.3898716846814!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed4d2b505f935!2sMission%20Bay%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 md:mb-6"
            style={{ color: '#1A1A1A' }}
          >
            Frequently Asked Questions
          </h2>
          <p 
            className="text-base md:text-lg text-center mb-12 md:mb-16 max-w-3xl mx-auto"
            style={{ color: '#1A1A1A' }}
          >
            Quick answers to common questions about our services
          </p>

          {/* FAQ Items */}
          <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="p-6 md:p-8 rounded-xl"
                style={{ backgroundColor: '#F8F9FA' }}
              >
                <h3 
                  className="text-lg md:text-xl font-extrabold mb-3 md:mb-4"
                  style={{ color: '#1A1A1A' }}
                >
                  {faq.question}
                </h3>
                <p 
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: '#6B6B6B' }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating "Talk with Us" Button */}
      <div 
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          className="flex items-center gap-3 px-6 py-4 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
          style={{ 
            backgroundColor: '#1A2B5B',
            color: '#FFFFFF'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="font-medium text-sm md:text-base">Talk with Us</span>
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default ContactUs

