function ConsultationProcess() {
  const steps = [
    {
      id: '01',
      number: '01',
      icon: '🔍',
      title: 'Assessment & Discovery',
      description: 'Comprehensive evaluation of your current technology landscape and business requirements',
      color: '#3498DB',
      buttonBg: '#3498DB',
    },
    {
      id: '02',
      number: '02',
      icon: '📋',
      title: 'Strategic Planning',
      description: 'Development of detailed transition roadmaps and implementation strategies',
      color: '#4ECDC4',
      buttonBg: '#4ECDC4',
    },
    {
      id: '03',
      number: '03',
      icon: '🏢',
      title: 'Vendor Coordination',
      description: 'Expert guidance in vendor selection and contract negotiations',
      color: '#FF6B35',
      buttonBg: '#FF6B35',
    },
    {
      id: '04',
      number: '04',
      icon: '⚙️',
      title: 'Transition Management',
      description: 'Hands-on oversight of implementation and change management processes',
      color: '#9B59B6',
      buttonBg: '#9B59B6',
    },
    {
      id: '05',
      number: '05',
      icon: '🛡️',
      title: 'Optimization & Support',
      description: 'Post-transition optimization and ongoing advisory support',
      color: '#2ECC71',
      buttonBg: '#2ECC71',
    },
  ]

  const dotColors = ['#F1C40F', '#4ECDC4', '#3498DB', '#FF6B35', '#9B59B6']

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Badge */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div 
            className="px-4 py-2 rounded-full text-sm md:text-base font-medium"
            style={{
              backgroundColor: '#E6FFFA',
              color: '#2A7F7F',
              border: '1px solid #B2F5EA',
            }}
          >
            Our Consultation Process
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 md:mb-6">
          <span style={{ color: '#1A1A1A' }}>How We Guide Your</span>{' '}
          <span style={{ color: '#2A7F7F' }}>Technology Transition</span>
        </h2>

        {/* Subtitle */}
        <p 
          className="text-base md:text-lg text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          style={{ color: '#6B6B6B' }}
        >
          Our proven methodology ensures smooth technology transitions with minimal disruption to your operations
        </p>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 mb-12 md:mb-16">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col relative"
              style={{
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Circular Badge at Top-Left (Overlapping) */}
              <div 
                className="absolute -top-3 -left-3 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-white text-base md:text-lg shadow-md z-10"
                style={{ 
                  backgroundColor: step.color,
                }}
              >
                {step.number}
              </div>

              {/* Icon Container - Vertical Pill Shape */}
              <div className="flex items-start gap-2 md:gap-3 mb-4 md:mb-6 pt-2">
                <div 
                  className="w-6 h-10 md:w-8 md:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: step.color,
                  }}
                >
                  <span className="text-white text-sm md:text-base">{step.icon}</span>
                </div>

                {/* Title - To the right of icon */}
                <h3 
                  className="text-sm md:text-base lg:text-lg font-bold leading-tight flex-1 min-w-0 line-clamp-2" 
                  style={{ 
                    color: '#1A1A1A',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {step.title.split(' & ').map((part, idx, arr) => (
                    <span key={idx}>
                      {part}
                      {idx < arr.length - 1 && ' & '}
                    </span>
                  ))}
                </h3>
              </div>

              {/* Description */}
              <p 
                className="text-sm md:text-base mb-6 md:mb-8 flex-grow leading-relaxed"
                style={{ color: '#6B6B6B' }}
              >
                {step.description}
              </p>

              {/* Button */}
              <button 
                className="w-full px-4 py-3 md:px-6 md:py-3 rounded-lg font-medium text-white text-sm md:text-base transition-colors duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#1565C0' }}
              >
                Learn More <span>→</span>
              </button>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-0 md:gap-1">
          {dotColors.map((color, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
              {index < dotColors.length - 1 && (
                <div 
                  className="w-8 md:w-12 h-0.5 md:h-1 mx-1 md:mx-2"
                  style={{ backgroundColor: '#D1D5DB' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConsultationProcess

