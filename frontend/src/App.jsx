import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './components/Home'
import ProjectDetail from './components/ProjectDetail'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import ContactUs from './components/ContactUs'
import WhyInhabitTech from './components/WhyInhabitTech'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminProjects from './components/admin/AdminProjects'
import AdminTeam from './components/admin/AdminTeam'
import AdminMilestones from './components/admin/AdminMilestones'
import AdminServices from './components/admin/AdminServices'
import AdminConsultations from './components/admin/AdminConsultations'
import AdminSettings from './components/admin/AdminSettings'
import ProjectForm from './components/admin/ProjectForm'
import TeamForm from './components/admin/TeamForm'
import MilestoneForm from './components/admin/MilestoneForm'
import ServiceForm from './components/admin/ServiceForm'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/why-inhabit-tech" element={<WhyInhabitTech />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<ContactUs />} />


      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/create"
        element={
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/edit/:id"
        element={
          <ProtectedRoute>
            <ProjectForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/team"
        element={
          <ProtectedRoute>
            <AdminTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/team/create"
        element={
          <ProtectedRoute>
            <TeamForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/team/edit/:id"
        element={
          <ProtectedRoute>
            <TeamForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/milestones"
        element={
          <ProtectedRoute>
            <AdminMilestones />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/milestones/create"
        element={
          <ProtectedRoute>
            <MilestoneForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/milestones/edit/:id"
        element={
          <ProtectedRoute>
            <MilestoneForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <ProtectedRoute>
            <AdminServices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/services/create"
        element={
          <ProtectedRoute>
            <ServiceForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/services/edit/:id"
        element={
          <ProtectedRoute>
            <ServiceForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/consultations"
        element={
          <ProtectedRoute>
            <AdminConsultations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  )
}

export default App
