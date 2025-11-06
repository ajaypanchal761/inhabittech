import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceAPI } from '../../services/api';
import AdminSidebar from './AdminSidebar';
import { useAdmin } from '../../context/AdminContext';

function AdminServices() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // Get all services (both active and inactive) for admin
      const response = await serviceAPI.getAllServices(null);
      if (response.data && response.data.services) {
        setServices(response.data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      try {
        await serviceAPI.deleteService(id);
        alert('Service deleted successfully!');
        fetchServices(); // Refresh list
      } catch (error) {
        alert('Error deleting service: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-border-light sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-bg-light rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-primary">Services</h1>
                  <p className="text-sm text-text-gray">Manage technology services</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/admin/services/create')}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm font-medium"
                >
                  + Add Service
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
              <p className="text-text-gray">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md p-8">
              <p className="text-text-gray text-lg mb-4">No services found</p>
              <button
                onClick={() => navigate('/admin/services/create')}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
              >
                Create First Service
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-border-light p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-text-gray mb-4 line-clamp-2">{service.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-sm text-text-gray">
                          Features: <span className="font-medium">{service.keyFeatures?.length || 0}</span>
                        </span>
                        <span className="text-sm text-text-gray">
                          Technologies: <span className="font-medium">{service.technologies?.length || 0}</span>
                        </span>
                        <span className="text-sm text-text-gray">
                          Benefits: <span className="font-medium">{service.benefits?.length || 0}</span>
                        </span>
                        <span className="text-sm text-text-gray">
                          Steps: <span className="font-medium">{service.implementationSteps?.length || 0}</span>
                        </span>
                        <span className="text-sm text-text-gray">
                          Order: <span className="font-medium">{service.order || 0}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/services/edit/${service._id}`)}
                        className="px-3 py-1 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminServices;

