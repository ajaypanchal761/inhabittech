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
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Projects />
      <ReadyToStart />
      <OurImpact />
      <TrustedPartners />
      <ConsultationProcess />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Home

