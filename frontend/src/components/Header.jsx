import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/newlogo.png'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isAboutPage = location.pathname === '/about'
  const isServicesPage = location.pathname === '/services'
  const isContactPage = location.pathname === '/contact'
  const isHomePage = location.pathname === '/'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleProjectsClick = (e) => {
    e.preventDefault()
    setIsMenuOpen(false)
    if (isHomePage) {
      // If on homepage, scroll to projects section
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If on another page, navigate to homepage first
      navigate('/')
      // After navigation, scroll to section
      setTimeout(() => {
        const projectsSection = document.getElementById('projects')
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg" style={{ backgroundColor: '#0D4A3A' }}>
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 md:h-24 lg:h-28 relative">
          {/* Logo - Image from assets folder - Left side */}
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className="flex items-center flex-shrink-0 max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-none"
          >
            <img 
              src={logo} 
              alt="Inhabit Tech Logo" 
              className="h-32 md:h-44 lg:h-52 xl:h-56 w-auto max-w-full"
              style={{ 
                transform: 'translateY(4px)',
                opacity: 1
              }}
            />
          </Link>

          {/* Navigation Links - Centered using flex with equal spacing */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              to="/" 
              className="text-white hover:text-[#4ECDC4] transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap px-3 py-1 rounded ${
                isAboutPage 
                  ? 'bg-[#4ECDC4] text-[#0D4A3A]' 
                  : 'text-white hover:text-[#4ECDC4]'
              }`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap px-3 py-1 rounded ${
                isServicesPage 
                  ? 'bg-[#4ECDC4] text-[#0D4A3A]' 
                  : 'text-white hover:text-[#4ECDC4]'
              }`}
            >
              Services
            </Link>
            <a 
              href="#projects" 
              onClick={handleProjectsClick}
              className="text-white hover:text-[#4ECDC4] transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
            >
              Projects
            </a>
            {/* Contact Us Button - Right after Projects */}
            <Link
              to="/contact"
              className={`px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg font-semibold text-sm lg:text-base transition-colors duration-200 whitespace-nowrap ${
                isContactPage 
                  ? 'bg-[#4ECDC4] text-[#0D4A3A]' 
                  : 'bg-[#3BB5AD] hover:bg-[#2FA5A0] text-white'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Hamburger Menu Button - Always visible on right */}
          <button 
            className="md:hidden text-white focus:outline-none flex-shrink-0 z-50"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu - Shows on small screens when menu is open */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 shadow-lg border-t border-gray-600 z-40" style={{ backgroundColor: '#0D4A3A' }}>
            <div className="flex flex-col px-4 py-4 space-y-3">
              <Link 
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-[#4ECDC4] transition-colors duration-200 font-medium text-base py-2"
              >
                Home
              </Link>
              <Link 
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors duration-200 font-medium text-base py-2 px-3 rounded ${
                  isAboutPage 
                    ? 'bg-[#4ECDC4] text-[#0D4A3A]' 
                    : 'text-white hover:text-[#4ECDC4]'
                }`}
              >
                About
              </Link>
              <Link 
                to="/services"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors duration-200 font-medium text-base py-2 px-3 rounded ${
                  isServicesPage 
                    ? 'bg-[#4ECDC4] text-[#0D4A3A]' 
                    : 'text-white hover:text-[#4ECDC4]'
                }`}
              >
                Services
              </Link>
              <a 
                href="#projects"
                onClick={handleProjectsClick}
                className="text-white hover:text-[#4ECDC4] transition-colors duration-200 font-medium text-base py-2"
              >
                Projects
              </a>
              {/* Contact Us Button */}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`px-5 py-2.5 rounded-lg font-semibold text-base transition-colors duration-200 text-center ${
                  isContactPage 
                    ? 'bg-[#4ECDC4] text-[#0D4A3A]' 
                    : 'bg-[#3BB5AD] hover:bg-[#2FA5A0] text-white'
                }`}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

