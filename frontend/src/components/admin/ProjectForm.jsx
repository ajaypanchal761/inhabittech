import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectAPI, serviceAPI } from '../../services/api';
import AdminSidebar from './AdminSidebar';
import { useAdmin } from '../../context/AdminContext';

function ProjectForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: '',
    solutionType: '',
    description: '',
    location: '',
    completionYear: '',
    projectType: '',
    status: 'completed',
    technologies: [],
    challenges: [],
    solutions: [],
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [techInput, setTechInput] = useState('');
  const [challengeInput, setChallengeInput] = useState('');
  const [solutionInput, setSolutionInput] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
    if (isEditMode) {
      fetchProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchServices = async () => {
    try {
      const response = await serviceAPI.getAllServices(null); // Get all services (active and inactive)
      if (response.data && response.data.services) {
        setServices(response.data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchProject = async () => {
    try {
      const response = await projectAPI.getProjectById(id);
      if (response.data && response.data.project) {
        const project = response.data.project;
        setFormData({
          title: project.title || '',
          client: project.client || '',
          category: project.category?._id || project.category || '', // Handle both ObjectId and string (for backward compatibility)
          solutionType: project.solutionType || '',
          description: project.description || '',
          location: project.location || '',
          completionYear: project.completionYear || '',
          projectType: project.projectType || '',
          status: project.status || 'completed',
          technologies: project.technologies || [],
          challenges: project.challenges || [],
          solutions: project.solutions || [],
        });
        setExistingImages(project.images || []);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      alert('Error loading project');
      navigate('/admin/projects');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleDeleteExistingImage = (publicId) => {
    setExistingImages(prev => prev.filter(img => img.publicId !== publicId));
    setImagesToDelete(prev => [...prev, publicId]);
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addChallenge = () => {
    if (challengeInput.trim()) {
      setFormData(prev => ({
        ...prev,
        challenges: [...prev.challenges, challengeInput.trim()]
      }));
      setChallengeInput('');
    }
  };

  const removeChallenge = (index) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.filter((_, i) => i !== index)
    }));
  };

  const addSolution = () => {
    if (solutionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        solutions: [...prev.solutions, solutionInput.trim()]
      }));
      setSolutionInput('');
    }
  };

  const removeSolution = (index) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = { ...formData };
      
      // Only add deleteImages if there are images to delete
      if (imagesToDelete.length > 0) {
        projectData.deleteImages = imagesToDelete;
      }

      if (isEditMode) {
        await projectAPI.updateProject(id, projectData, images);
        alert('Project updated successfully!');
      } else {
        await projectAPI.createProject(projectData, images);
        alert('Project created successfully!');
      }
      navigate('/admin/projects');
    } catch (error) {
      alert('Error saving project: ' + error.message);
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
                    {isEditMode ? 'Edit Project' : 'Add New Project'}
                  </h1>
                  <p className="text-sm text-text-gray">
                    {isEditMode ? 'Update project details' : 'Create a new project'}
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
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border border-border-light">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Project Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Client <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Client Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none bg-white pr-10"
                    >
                      <option value="">Select a service category</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {/* Dropdown Arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Solution Type
                  </label>
                  <input
                    type="text"
                    name="solutionType"
                    value={formData.solutionType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Solution Type"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Project Location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    name="completionYear"
                    value={formData.completionYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Project Type
                  </label>
                  <input
                    type="text"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Project Type"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Project description"
                />
              </div>
            </div>

            {/* Images */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-6">Images</h2>
              
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-dark mb-3">
                    Existing Images
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {existingImages.map((img, index) => (
                      <div key={img.publicId} className="relative group">
                        <img
                          src={img.url}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-border-gray"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteExistingImage(img.publicId)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  {isEditMode ? 'Add New Images' : 'Upload Images'}
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <p className="text-xs text-text-gray mt-2">
                  You can select multiple images (max 10, each max 10MB)
                </p>
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-border-gray"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-6">Technologies</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Add technology"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="text-primary hover:text-primary-dark"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-6">Challenges</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={challengeInput}
                  onChange={(e) => setChallengeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChallenge())}
                  className="flex-1 px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Add challenge"
                />
                <button
                  type="button"
                  onClick={addChallenge}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-bg-light rounded-lg flex items-center justify-between"
                  >
                    <span className="text-text-dark">{challenge}</span>
                    <button
                      type="button"
                      onClick={() => removeChallenge(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-6">Solutions</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={solutionInput}
                  onChange={(e) => setSolutionInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSolution())}
                  className="flex-1 px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Add solution"
                />
                <button
                  type="button"
                  onClick={addSolution}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-bg-light rounded-lg flex items-center justify-between"
                  >
                    <span className="text-text-dark">{solution}</span>
                    <button
                      type="button"
                      onClick={() => removeSolution(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 justify-end pt-6 border-t border-border-light">
              <button
                type="button"
                onClick={() => navigate('/admin/projects')}
                className="px-6 py-3 border border-border-gray text-text-dark rounded-lg hover:bg-bg-light transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ProjectForm;

