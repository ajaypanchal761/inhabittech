import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { teamAPI } from '../../services/api';
import AdminSidebar from './AdminSidebar';
import { useAdmin } from '../../context/AdminContext';

function TeamForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    order: 0,
    isActive: true,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchTeamMember();
    }
  }, [id]);

  const fetchTeamMember = async () => {
    try {
      const response = await teamAPI.getTeamMemberById(id);
      if (response.data && response.data.teamMember) {
        const member = response.data.teamMember;
        setFormData({
          name: member.name || '',
          role: member.role || '',
          description: member.description || '',
          order: member.order || 0,
          isActive: member.isActive !== undefined ? member.isActive : true,
        });
        if (member.image) {
          setExistingImage(member.image);
          setImagePreview(member.image.url);
        }
      }
    } catch (error) {
      console.error('Error fetching team member:', error);
      alert('Error loading team member');
      navigate('/admin/team');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'order' ? parseInt(value) || 0 : value)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (!isEditMode && !image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      if (isEditMode) {
        await teamAPI.updateTeamMember(id, formData, image);
        alert('Team member updated successfully!');
      } else {
        await teamAPI.createTeamMember(formData, image);
        alert('Team member created successfully!');
      }
      navigate('/admin/team');
    } catch (error) {
      alert('Error saving team member: ' + error.message);
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
                  <h1 className="text-2xl font-bold text-primary">
                    {isEditMode ? 'Edit Team Member' : 'Add Team Member'}
                  </h1>
                  <p className="text-sm text-text-gray">
                    {isEditMode ? 'Update team member details' : 'Add a new team member'}
                  </p>
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
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Image <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="w-32 h-32 rounded-lg overflow-hidden border border-border-light">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-text-gray file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark file:cursor-pointer"
                    />
                    <p className="mt-1 text-xs text-text-gray">
                      {isEditMode ? 'Upload a new image to replace the existing one' : 'Upload team member image'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter team member name"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter role (e.g., CEO & Founder)"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter team member description"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0"
                />
                <p className="mt-1 text-xs text-text-gray">
                  Lower numbers appear first. Default is 0.
                </p>
              </div>

              {/* Is Active */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border-light rounded focus:ring-primary"
                />
                <label className="text-sm font-medium text-text-dark">
                  Active (visible on website)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : isEditMode ? 'Update Team Member' : 'Create Team Member'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/team')}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-text-dark rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeamForm;

