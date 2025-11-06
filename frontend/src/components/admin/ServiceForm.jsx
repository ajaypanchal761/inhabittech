import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { serviceAPI } from '../../services/api';
import AdminSidebar from './AdminSidebar';
import { useAdmin } from '../../context/AdminContext';
import IconSelector from './IconSelector';

function ServiceForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: {
      url: '',
      publicId: '',
    },
    image: {
      url: '',
      publicId: '',
    },
    keyFeatures: [],
    technologies: [],
    benefits: [],
    implementationSteps: [],
    successStory: {
      client: '',
      challenge: '',
      solution: '',
      results: '',
    },
    order: 0,
    isActive: true,
  });
  const [selectedIconName, setSelectedIconName] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Temporary state for array inputs
  const [keyFeatureInput, setKeyFeatureInput] = useState('');
  const [technologyInput, setTechnologyInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await serviceAPI.getServiceById(id);
      if (response.data && response.data.service) {
        const service = response.data.service;
        setFormData({
          title: service.title || '',
          description: service.description || '',
          icon: service.icon || { url: '', publicId: '' },
          image: service.image || { url: '', publicId: '' },
          keyFeatures: service.keyFeatures || [],
          technologies: service.technologies || [],
          benefits: service.benefits || [],
          implementationSteps: service.implementationSteps || [],
          successStory: service.successStory || {
            client: '',
            challenge: '',
            solution: '',
            results: '',
          },
          order: service.order || 0,
          isActive: service.isActive !== undefined ? service.isActive : true,
        });
        // Set selected icon name if icon exists
        if (service.icon && service.icon.url) {
          setSelectedIconName('selected'); // We'll store the icon URL but not the name
        }
        // Set image preview if image exists
        if (service.image && service.image.url) {
          setImagePreview(service.image.url);
        }
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      alert('Error loading service');
      navigate('/admin/services');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleIconSelect = (iconName, iconUrl, iconPublicId) => {
    if (iconName && iconUrl) {
      setFormData(prev => ({
        ...prev,
        icon: {
          url: iconUrl,
          publicId: iconPublicId || ''
        }
      }));
      setSelectedIconName(iconName);
    } else {
      setFormData(prev => ({
        ...prev,
        icon: {
          url: '',
          publicId: ''
        }
      }));
      setSelectedIconName(null);
    }
  };

  const handleSuccessStoryChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      successStory: {
        ...prev.successStory,
        [name]: value
      }
    }));
  };

  const handleImplementationStepChange = (index, field, value) => {
    setFormData(prev => {
      const steps = [...prev.implementationSteps];
      steps[index] = {
        ...steps[index],
        [field]: field === 'number' ? Number(value) : value
      };
      return { ...prev, implementationSteps: steps };
    });
  };

  const addKeyFeature = () => {
    if (keyFeatureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        keyFeatures: [...prev.keyFeatures, keyFeatureInput.trim()]
      }));
      setKeyFeatureInput('');
    }
  };

  const removeKeyFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  };

  const addTechnology = () => {
    if (technologyInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, technologyInput.trim()]
      }));
      setTechnologyInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, benefitInput.trim()]
      }));
      setBenefitInput('');
    }
  };

  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const addImplementationStep = () => {
    setFormData(prev => ({
      ...prev,
      implementationSteps: [
        ...prev.implementationSteps,
        { number: prev.implementationSteps.length + 1, title: '' }
      ]
    }));
  };

  const removeImplementationStep = (index) => {
    setFormData(prev => ({
      ...prev,
      implementationSteps: prev.implementationSteps.filter((_, i) => i !== index).map((step, idx) => ({
        ...step,
        number: idx + 1
      }))
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: { url: '', publicId: '' }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Add all form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('keyFeatures', JSON.stringify(formData.keyFeatures));
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));
      formDataToSend.append('benefits', JSON.stringify(formData.benefits));
      formDataToSend.append('implementationSteps', JSON.stringify(formData.implementationSteps));
      formDataToSend.append('successStory', JSON.stringify(formData.successStory));
      formDataToSend.append('order', formData.order);
      formDataToSend.append('isActive', formData.isActive);

      // Add icon URL if icon is selected (icon is already uploaded via IconSelector)
      if (formData.icon?.url) {
        formDataToSend.append('iconUrl', formData.icon.url);
        formDataToSend.append('iconPublicId', formData.icon.publicId || '');
      }

      // Add image file if new image is selected
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      // Handle image deletion in edit mode
      if (isEditMode && !imageFile && formData.image.url) {
        // If no new image and old image exists, keep the old one
        // If user wants to delete, they need to explicitly remove it
      }

      if (isEditMode) {
        await serviceAPI.updateService(id, formDataToSend);
        alert('Service updated successfully!');
      } else {
        await serviceAPI.createService(formDataToSend);
        alert('Service created successfully!');
      }
      navigate('/admin/services');
    } catch (error) {
      alert('Error saving service: ' + error.message);
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
                    {isEditMode ? 'Edit Service' : 'Add New Service'}
                  </h1>
                  <p className="text-sm text-text-gray">
                    {isEditMode ? 'Update service details' : 'Create a new service'}
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
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border border-border-light space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-6">Service Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
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
                    placeholder="e.g., Hotel Systems Integration"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Service description"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <IconSelector
                    selectedIcon={selectedIconName}
                    onIconSelect={handleIconSelect}
                    existingIconUrl={formData.icon?.url}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Service Image
                  </label>
                  {imagePreview && (
                    <div className="mb-4 p-4 border border-border-gray rounded-lg bg-bg-light">
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Service preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                  <p className="text-xs text-text-gray mt-2">
                    Upload a service image (JPG, PNG, WebP - max 10MB)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      id="isActive"
                      className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-text-dark">
                      Is Active (Show on public Services page)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Key Features</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={keyFeatureInput}
                  onChange={(e) => setKeyFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyFeature())}
                  className="flex-1 px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Add a key feature and press Enter"
                />
                <button
                  type="button"
                  onClick={addKeyFeature}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.keyFeatures.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm flex items-center gap-2"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeKeyFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Technologies</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={technologyInput}
                  onChange={(e) => setTechnologyInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  className="flex-1 px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Add a technology and press Enter"
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
                    className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Benefits</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                  className="flex-1 px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Add a benefit and press Enter"
                />
                <button
                  type="button"
                  onClick={addBenefit}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm flex items-center gap-2"
                  >
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Implementation Steps */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Implementation Steps</h2>
              <button
                type="button"
                onClick={addImplementationStep}
                className="mb-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm"
              >
                + Add Step
              </button>
              <div className="space-y-3">
                {formData.implementationSteps.map((step, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <input
                      type="number"
                      value={step.number}
                      onChange={(e) => handleImplementationStepChange(index, 'number', e.target.value)}
                      className="w-16 px-2 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      min="1"
                    />
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleImplementationStepChange(index, 'title', e.target.value)}
                      className="flex-1 px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="Step title"
                    />
                    <button
                      type="button"
                      onClick={() => removeImplementationStep(index)}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Story */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Success Story</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Client</label>
                  <input
                    type="text"
                    name="client"
                    value={formData.successStory.client}
                    onChange={handleSuccessStoryChange}
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="e.g., Hilton Garden Inn London"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Challenge</label>
                  <textarea
                    name="challenge"
                    value={formData.successStory.challenge}
                    onChange={handleSuccessStoryChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Describe the challenge"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Solution</label>
                  <textarea
                    name="solution"
                    value={formData.successStory.solution}
                    onChange={handleSuccessStoryChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Describe the solution"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Results</label>
                  <textarea
                    name="results"
                    value={formData.successStory.results}
                    onChange={handleSuccessStoryChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="e.g., 40% reduction in manual data entry, 25% increase in operational efficiency"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/admin/services')}
                className="px-6 py-3 border border-border-gray rounded-lg text-text-dark hover:bg-bg-light transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (isEditMode ? 'Update Service' : 'Add Service')}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ServiceForm;

