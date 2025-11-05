import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { adminAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

function AdminDashboard() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalAdmins: 0,
    activeAdmins: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getAllAdmins();
      if (response.data && response.data.admins) {
        const admins = response.data.admins;
        setStats({
          totalAdmins: admins.length,
          activeAdmins: admins.filter((a) => a.isActive).length,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-bg-light flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-border-light sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-bg-light rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
                  <p className="text-sm text-text-gray">Welcome back, {admin?.name}</p>
                </div>
              </div>
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
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Admins Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-gray mb-1">Total Admins</p>
                <p className="text-3xl font-bold text-primary">
                  {loading ? '...' : stats.totalAdmins}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Admins Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-gray mb-1">Active Admins</p>
                <p className="text-3xl font-bold text-secondary">
                  {loading ? '...' : stats.activeAdmins}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Admin Info Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-gray mb-1">Your Role</p>
                <p className="text-xl font-bold text-accent capitalize">
                  {admin?.role || 'Admin'}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Profile Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
          <h2 className="text-xl font-bold text-primary mb-6">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-text-gray mb-1">Name</p>
              <p className="text-base font-medium text-text-dark">{admin?.name}</p>
            </div>
            <div>
              <p className="text-sm text-text-gray mb-1">Email</p>
              <p className="text-base font-medium text-text-dark">{admin?.email}</p>
            </div>
            <div>
              <p className="text-sm text-text-gray mb-1">Role</p>
              <p className="text-base font-medium text-accent capitalize">
                {admin?.role || 'Admin'}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-gray mb-1">Status</p>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                  admin?.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {admin?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-border-light">
          <h2 className="text-xl font-bold text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 border border-border-gray rounded-lg hover:bg-bg-light transition-colors text-left">
              <h3 className="font-semibold text-text-dark mb-1">Manage Admins</h3>
              <p className="text-sm text-text-gray">View and manage all admin accounts</p>
            </button>
            <button className="p-4 border border-border-gray rounded-lg hover:bg-bg-light transition-colors text-left">
              <h3 className="font-semibold text-text-dark mb-1">Settings</h3>
              <p className="text-sm text-text-gray">Configure system settings</p>
            </button>
            <button className="p-4 border border-border-gray rounded-lg hover:bg-bg-light transition-colors text-left">
              <h3 className="font-semibold text-text-dark mb-1">Reports</h3>
              <p className="text-sm text-text-gray">View system reports and analytics</p>
            </button>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

