import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import image1 from '../assets/images (1).jpeg'
import image2 from '../assets/images (2).jpeg'
import image3 from '../assets/images (3).jpeg'
import image4 from '../assets/images (4).jpeg'

function AboutUs() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      description: '15+ years in hospitality technology, former VP at Marriott International',
      image: image1
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Former Google engineer, expert in cloud architecture and AI systems',
      image: image2
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      description: 'Operations specialist with 12 years at Hilton and Hyatt properties',
      image: image3
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      description: 'Full-stack developer specializing in hospitality management systems',
      image: image4
    }
  ]

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M6.343 6.343l-.707.707m12.728 0l-.707.707M6.343 17.657l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Innovation',
      description: "We constantly push the boundaries of what's possible in hospitality technology"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Guest-Centric',
      description: 'Every solution we build is designed to enhance the guest experience'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Reliability',
      description: 'Our systems are built for 99.9% uptime and enterprise-grade security'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Partnership',
      description: 'We work as an extension of your team, not just a vendor'
    }
  ]

  const timeline = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize hospitality technology',
      position: 'left'
    },
    {
      year: '2019',
      title: 'First Major Client',
      description: 'Successfully integrated systems for 50-room boutique hotel',
      position: 'right'
    },
    {
      year: '2020',
      title: 'Cloud Migration',
      description: 'Helped 100+ hotels transition to cloud-based systems during pandemic',
      position: 'left'
    },
    {
      year: '2021',
      title: 'AI Integration',
      description: 'Launched AI-powered guest experience solutions',
      position: 'right'
    },
    {
      year: '2022',
      title: 'International Expansion',
      description: 'Expanded services to Europe and Asia markets',
      position: 'left'
    },
    {
      year: '2023',
      title: '500+ Hotels Served',
      description: 'Reached milestone of serving over 500 hotel properties worldwide',
      position: 'right'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-24 pb-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Link 
              to="/" 
              className="text-sm md:text-base flex items-center gap-2"
              style={{ color: '#3B82F6' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <span 
              className="px-3 py-1 rounded-full text-sm md:text-base font-medium"
              style={{ 
                backgroundColor: '#E0F7F5',
                color: '#3B82F6'
              }}
            >
              About Our Company
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 md:mb-8"
          >
            <span style={{ color: '#3B82F6' }}>Transforming </span>
            <span style={{ color: '#1E40AF' }}>Hospitality </span>
            <span style={{ color: '#3B82F6' }}>Through Technology</span>
          </h1>
          <p 
            className="text-base md:text-lg lg:text-xl text-center mb-8 md:mb-12 max-w-4xl mx-auto"
            style={{ color: '#6B6B6B' }}
          >
            We're a team of hospitality and technology experts dedicated to helping hotels deliver exceptional guest experiences through innovative technology solutions.
          </p>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2"
                style={{ color: '#3B82F6' }}
              >
                500+
              </div>
              <p 
                className="text-base md:text-lg"
                style={{ color: '#6B6B6B' }}
              >
                Hotels Served
              </p>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2"
                style={{ color: '#3B82F6' }}
              >
                50+
              </div>
              <p 
                className="text-base md:text-lg"
                style={{ color: '#6B6B6B' }}
              >
                Countries
              </p>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2"
                style={{ color: '#3B82F6' }}
              >
                99.9%
              </div>
              <p 
                className="text-base md:text-lg"
                style={{ color: '#6B6B6B' }}
              >
                Uptime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 md:mb-8"
                style={{ color: '#1A2B5B' }}
              >
                Our Story
              </h2>
              <p 
                className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed"
                style={{ color: '#6B6B6B' }}
              >
                Founded in 2018 by hospitality industry veterans, we recognized the growing gap between guest expectations and hotel technology capabilities. Our mission became clear: bridge this gap with innovative, reliable solutions.
              </p>
              <p 
                className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed"
                style={{ color: '#6B6B6B' }}
              >
                Today, we're proud to serve over 500 hotels worldwide, from boutique properties to major chains, helping them deliver exceptional guest experiences through cutting-edge technology.
              </p>
              
              {/* Bullet Points */}
              <ul className="space-y-3 md:space-y-4">
                {[
                  'Industry-leading expertise in hospitality technology',
                  '24/7 support and monitoring for all our clients',
                  'Proven track record of successful implementations'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#4ECDC4' }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span 
                      className="text-base md:text-lg"
                      style={{ color: '#6B6B6B' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side - Image Placeholder */}
            <div 
              className="rounded-xl overflow-hidden h-64 md:h-80 lg:h-96 flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(to bottom, #E0F7F5 0%, #FFFFFF 100%)'
              }}
            >
              <p 
                className="text-lg md:text-xl"
                style={{ color: '#9CA3AF' }}
              >
                Our Story
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 md:mb-6"
            style={{ color: '#1A2B5B' }}
          >
            Our Values
          </h2>
          <p 
            className="text-base md:text-lg text-center mb-12 md:mb-16 max-w-3xl mx-auto"
            style={{ color: '#6B6B6B' }}
          >
            The principles that guide everything we do
          </p>

          {/* Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="p-6 md:p-8 rounded-xl text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div 
                  className="flex items-center justify-center mb-4 md:mb-6"
                  style={{ color: '#4ECDC4' }}
                >
                  {value.icon}
                </div>
                <h3 
                  className="text-xl md:text-2xl font-extrabold mb-3 md:mb-4"
                  style={{ color: '#1A2B5B' }}
                >
                  {value.title}
                </h3>
                <p 
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: '#6B6B6B' }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 md:mb-6"
            style={{ color: '#1A2B5B' }}
          >
            Meet Our Team
          </h2>
          <p 
            className="text-base md:text-lg text-center mb-12 md:mb-16 max-w-3xl mx-auto"
            style={{ color: '#6B6B6B' }}
          >
            Industry experts passionate about hospitality technology
          </p>

          {/* Team Member Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div 
                  className="w-full h-48 md:h-56 bg-gray-200 flex items-center justify-center"
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 
                    className="text-lg md:text-xl font-extrabold mb-1"
                    style={{ color: '#1A2B5B' }}
                  >
                    {member.name}
                  </h3>
                  <p 
                    className="text-sm md:text-base mb-3"
                    style={{ color: '#1A2B5B' }}
                  >
                    {member.role}
                  </p>
                  <p 
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: '#6B6B6B' }}
                  >
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 md:mb-6"
            style={{ color: '#1A2B5B' }}
          >
            Our Journey
          </h2>
          <p 
            className="text-base md:text-lg text-center mb-12 md:mb-16 max-w-3xl mx-auto"
            style={{ color: '#6B6B6B' }}
          >
            Key milestones in our growth and evolution
          </p>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div 
              className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden md:block"
              style={{ backgroundColor: '#E5E7EB', transform: 'translateX(-50%)' }}
            />

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
                    item.position === 'left' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Year Circle */}
                  <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div 
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-lg md:text-xl text-white shadow-lg"
                        style={{ backgroundColor: '#4ECDC4' }}
                      >
                        {item.year}
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full hidden md:block"
                        style={{ backgroundColor: '#4ECDC4' }}
                      />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2">
                    <div 
                      className="p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm bg-white"
                    >
                      <h3 
                        className="text-xl md:text-2xl font-extrabold mb-3"
                        style={{ color: '#1A2B5B' }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: '#6B6B6B' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: '#1A2B5B' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-base md:text-lg text-white mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how we can help transform your hotel's technology infrastructure
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button 
              className="px-8 py-4 md:px-10 md:py-5 rounded-lg font-medium text-base md:text-lg transition-all duration-200 hover:opacity-90"
              style={{ 
                backgroundColor: '#F1C40F',
                color: '#1A2B5B'
              }}
            >
              Get in Touch
            </button>
            <button 
              className="px-8 py-4 md:px-10 md:py-5 rounded-lg font-medium text-base md:text-lg transition-all duration-200 hover:opacity-90 border-2"
              style={{ 
                backgroundColor: '#FFFFFF',
                color: '#1A2B5B',
                borderColor: '#1A2B5B'
              }}
            >
              View Our Services
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUs

