function ReadyToStart() {
  return (
    <section className="pt-4 md:pt-6 pb-8 md:pb-10 bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div 
          className="rounded-3xl p-6 md:p-8 lg:p-10 text-center shadow-lg"
          style={{ 
            background: 'linear-gradient(180deg, #2A7F7F 0%, #1A5F5F 100%)',
          }}
        >
          {/* Heading */}
          <h3 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 text-center"
            style={{ 
              fontSize: '48px',
              fontWeight: '700',
              lineHeight: '48px',
              marginBottom: '12px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
            }}
          >
            Ready to Start Your Project?
          </h3>
          
          {/* Description */}
          <p 
            className="text-white mb-5 text-center mx-auto leading-relaxed"
            style={{ 
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '28px',
              marginBottom: '20px',
              maxWidth: '100%',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
            }}
          >
            Join our growing list of satisfied clients and transform your hospitality business with our innovative technology solutions.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <button 
              className="rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
              style={{ 
                backgroundColor: '#FFFFFF',
                color: '#2A7F7F',
                fontSize: '18px',
                fontWeight: '500',
                borderRadius: '12px',
                padding: '20px 40px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
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

