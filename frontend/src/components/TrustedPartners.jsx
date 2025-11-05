function TrustedPartners() {
  const partners = [
    { name: 'Accor', color: '#E74C3C' },
    { name: 'Ennismore', color: '#2C3E50' },
    { name: 'The Hoxton', color: '#2C3E50' },
    { name: 'Pullman', color: '#3498DB' },
    { name: 'Mama Shelter', color: '#E91E63' },
    { name: 'Mondrian', color: '#2C3E50' },
    { name: 'Point A Hotels', color: '#3498DB' },
    { name: 'Hyde Hotels', color: '#2C3E50' },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Main Heading */}
        <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 md:mb-6"
          style={{ color: '#2C3E50' }}
        >
          Trusted by Leading Hotel Brands
        </h2>

        {/* Description Paragraph */}
        <p 
          className="text-base md:text-lg text-center mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed"
          style={{ color: '#6C7A89' }}
        >
          We've partnered with prestigious hospitality brands worldwide to deliver exceptional technology solutions and consultation services.
        </p>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-6 md:p-8 rounded-xl shadow-sm"
              style={{ 
                backgroundColor: '#F8F9FA',
                border: '1px solid #E0E6ED',
              }}
            >
              <span 
                className="text-lg md:text-xl lg:text-2xl font-bold text-center"
                style={{ color: partner.color }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* Concluding Text */}
        <p 
          className="text-base md:text-lg text-center"
          style={{ color: '#6C7A89' }}
        >
          Join 500+ hospitality partners who trust our expertise
        </p>
      </div>
    </section>
  )
}

export default TrustedPartners

