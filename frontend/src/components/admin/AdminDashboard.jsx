import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { projectAPI, teamAPI, milestoneAPI, serviceAPI, consultationAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

function AdminDashboard() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    projects: { total: 0, active: 0 },
    team: { total: 0, active: 0 },
    milestones: { total: 0, active: 0 },
    services: { total: 0, active: 0 },
    consultations: { total: 0, pending: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all stats in parallel
      const [projectsRes, teamRes, milestonesRes, servicesRes, consultationsRes] = await Promise.all([
        projectAPI.getAllProjects(null).catch(() => ({ data: { projects: [] } })),
        teamAPI.getAllTeamMembers(null).catch(() => ({ data: { teamMembers: [] } })),
        milestoneAPI.getAllMilestones(null).catch(() => ({ data: { milestones: [] } })),
        serviceAPI.getAllServices(null).catch(() => ({ data: { services: [] } })),
        consultationAPI.getAllConsultations(null).catch(() => ({ data: { consultations: [] } })),
      ]);

      const projects = projectsRes.data?.projects || [];
      const teamMembers = teamRes.data?.teamMembers || [];
      const milestones = milestonesRes.data?.milestones || [];
      const services = servicesRes.data?.services || [];
      const consultations = consultationsRes.data?.consultations || [];

      setStats({
        projects: {
          total: projects.length,
          active: projects.filter((p) => p.isActive).length,
        },
        team: {
          total: teamMembers.length,
          active: teamMembers.filter((t) => t.isActive).length,
        },
        milestones: {
          total: milestones.length,
          active: milestones.filter((m) => m.isActive).length,
        },
        services: {
          total: services.length,
          active: services.filter((s) => s.isActive).length,
        },
        consultations: {
          total: consultations.length,
          pending: consultations.filter((c) => c.status === 'pending').length,
        },
      });
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
            {/* Projects Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-gray mb-1">Total Projects</p>
                  <p className="text-3xl font-bold text-primary">
                    {loading ? '...' : stats.projects.total}
                  </p>
                  <p className="text-xs text-text-gray mt-1">
                    {loading ? '...' : `${stats.projects.active} active`}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Team Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-gray mb-1">Team Members</p>
                  <p className="text-3xl font-bold text-primary">
                    {loading ? '...' : stats.team.total}
                  </p>
                  <p className="text-xs text-text-gray mt-1">
                    {loading ? '...' : `${stats.team.active} active`}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Milestones Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-gray mb-1">Milestones</p>
                  <p className="text-3xl font-bold text-primary">
                    {loading ? '...' : stats.milestones.total}
                  </p>
                  <p className="text-xs text-text-gray mt-1">
                    {loading ? '...' : `${stats.milestones.active} active`}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Services Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-gray mb-1">Services</p>
                  <p className="text-3xl font-bold text-primary">
                    {loading ? '...' : stats.services.total}
                  </p>
                  <p className="text-xs text-text-gray mt-1">
                    {loading ? '...' : `${stats.services.active} active`}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Consultations Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-gray mb-1">Consultations</p>
                  <p className="text-3xl font-bold text-primary">
                    {loading ? '...' : stats.consultations.total}
                  </p>
                  <p className="text-xs text-text-gray mt-1">
                    {loading ? '...' : `${stats.consultations.pending} pending`}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Admin Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-gray mb-1">Your Role</p>
                  <p className="text-xl font-bold text-primary capitalize">
                    {admin?.role || 'Admin'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Profile Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-border-light mb-8">
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
                <p className="text-base font-medium text-primary capitalize">
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
          <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
            <h2 className="text-xl font-bold text-primary mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/admin/projects')}
                className="p-4 border border-border-gray rounded-lg hover:bg-bg-light transition-colors text-left"
              >
                <h3 className="font-semibold text-text-dark mb-1">Manage Projects</h3>
                <p className="text-sm text-text-gray">View and manage all projects</p>
              </button>
              <button
                onClick={() => navigate('/admin/team')}
                className="p-4 border border-border-gray rounded-lg hover:bg-bg-light transition-colors text-left"
              >
                <h3 className="font-semibold text-text-dark mb-1">Manage Team</h3>
                <p className="text-sm text-text-gray">View and manage team members</p>
              </button>
              <button
                onClick={() => navigate('/admin/services')}
                className="p-4 border border-border-gray rounded-lg hover:bg-bg-light transition-colors text-left"
              >
                <h3 className="font-semibold text-text-dark mb-1">Manage Services</h3>
                <p className="text-sm text-text-gray">View and manage services</p>
              </button>
              <button
                onClick={() => navigate('/admin/consultations')}
                className="p-4 border border-border-gray rounded-lg hover:bg-bg-light transition-colors text-left"
              >
                <h3 className="font-semibold text-text-dark mb-1">View Consultations</h3>
                <p className="text-sm text-text-gray">View and manage consultation requests</p>
              </button>
              <button
                onClick={() => navigate('/admin/settings')}
                className="p-4 border border-border-gray rounded-lg hover:bg-bg-light transition-colors text-left"
              >
                <h3 className="font-semibold text-text-dark mb-1">Settings</h3>
                <p className="text-sm text-text-gray">Configure settings and change password</p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
