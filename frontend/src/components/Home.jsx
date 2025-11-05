import { useEffect } from 'react'
import AOS from 'aos'
import Header from './Header'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import ReadyToStart from './ReadyToStart'
import OurImpact from './OurImpact'
import TrustedPartners from './TrustedPartners'
import ConsultationProcess from './ConsultationProcess'
import ContactForm from './ContactForm'
import Footer from './Footer'

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div data-aos="fade-up">
        <Hero />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <About />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <Projects />
      </div>
      <div data-aos="fade-up" data-aos-delay="300">
        <ReadyToStart />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <OurImpact />
      </div>
      <div data-aos="fade-up" data-aos-delay="500">
        <TrustedPartners />
      </div>
      <div data-aos="fade-up" data-aos-delay="600">
        <ConsultationProcess />
      </div>
      <div data-aos="fade-up" data-aos-delay="700">
        <ContactForm />
      </div>
      <Footer />
    </div>
  )
}

export default Home

