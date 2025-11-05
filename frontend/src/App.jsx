import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import ProjectDetail from './components/ProjectDetail'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import ContactUs from './components/ContactUs'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminProjects from './components/admin/AdminProjects'
import AdminManageAdmins from './components/admin/AdminManageAdmins'
import AdminSettings from './components/admin/AdminSettings'
import ProjectForm from './components/admin/ProjectForm'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/about" element={<AboutUs />} />
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
        path="/admin/admins"
        element={
          <ProtectedRoute>
            <AdminManageAdmins />
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
  )
}

export default App
