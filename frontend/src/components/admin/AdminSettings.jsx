import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAdmin } from '../../context/AdminContext';
import { adminAPI } from '../../services/api';

function AdminSettings() {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    setLoading(true);

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All fields are required');
      setLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      setLoading(false);
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordError('New password must be different from current password');
      setLoading(false);
      return;
    }

    try {
      await adminAPI.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setPasswordError(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
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
                  <h1 className="text-2xl font-bold text-primary">Settings</h1>
                  <p className="text-sm text-text-gray">Configure your account settings</p>
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

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Change Password Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-border-light mb-8">
            <h2 className="text-xl font-bold text-primary mb-6">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-text-dark mb-2">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-text-dark mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Enter new password (min 6 characters)"
                />
                <p className="text-xs text-text-gray mt-1">Password must be at least 6 characters long</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-dark mb-2">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Confirm new password"
                />
              </div>

              {passwordError && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-red-800 text-sm">{passwordError}</p>
                </div>
              )}

              {passwordSuccess && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-green-800 text-sm">{passwordSuccess}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>

          {/* Account Information Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-border-light">
            <h2 className="text-xl font-bold text-primary mb-6">Account Information</h2>
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
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;
