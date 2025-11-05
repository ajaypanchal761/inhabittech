import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ProjectDetail from './components/ProjectDetail'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import ContactUs from './components/ContactUs'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  )
}

export default App
