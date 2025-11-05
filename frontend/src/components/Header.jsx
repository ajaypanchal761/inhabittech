import logo from '../assets/logo.png'

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 relative">
          {/* Logo - Image from assets folder - Left side */}
          <div className="flex items-center flex-shrink-0">
            <img 
              src={logo} 
              alt="Inhabit Tech Logo" 
              className="h-20 md:h-24 lg:h-28 w-auto"
              style={{ 
                transform: 'translateY(-4px)',
                opacity: 1
              }}
            />
          </div>

          {/* Navigation Links - Centered using flex with equal spacing */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 absolute left-1/2 transform -translate-x-1/2">
            <a 
              href="#home" 
              className="text-[#1A1A1A] hover:text-[#0D4A3A] transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-[#1A1A1A] hover:text-[#0D4A3A] transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
            >
              About
            </a>
            <a 
              href="#services" 
              className="text-[#1A1A1A] hover:text-[#0D4A3A] transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
            >
              Services
            </a>
            <a 
              href="#projects" 
              className="text-[#1A1A1A] hover:text-[#0D4A3A] transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
            >
              Projects
            </a>
            {/* Contact Us Button - Right after Projects */}
            <a
              href="#contact"
              style={{ backgroundColor: '#3BB5AD' }}
              className="hover:bg-[#2FA5A0] text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg font-semibold text-sm lg:text-base transition-colors duration-200 whitespace-nowrap"
            >
              Contact Us
            </a>
          </div>

          {/* Hamburger Menu Button - Always visible on right */}
          <button 
            className="text-[#1A1A1A] focus:outline-none flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header

