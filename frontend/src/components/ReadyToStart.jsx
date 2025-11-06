function ReadyToStart() {
  return (
    <section className="pt-4 md:pt-6 pb-8 md:pb-10 bg-gradient-to-br from-slate-50 to-teal-50 overflow-x-hidden w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        <div 
          className="rounded-3xl p-6 md:p-8 lg:p-10 text-center shadow-lg"
          style={{ 
            background: 'linear-gradient(180deg, #2A7F7F 0%, #1A5F5F 100%)',
          }}
        >
          {/* Heading */}
          <h3 
            className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 md:mb-4 text-center leading-tight"
          >
            Ready to Start Your Project?
          </h3>
          
          {/* Description */}
          <p 
            className="text-white text-sm md:text-base lg:text-lg mb-4 md:mb-5 text-center mx-auto leading-relaxed px-2"
          >
            Join our growing list of satisfied clients and transform your hospitality business with our innovative technology solutions.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <button 
              className="px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-xl font-medium text-sm md:text-base lg:text-lg transition-all duration-200 hover:shadow-lg"
              style={{ 
                backgroundColor: '#FFFFFF',
                color: '#2A7F7F'
              }}
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReadyToStart

