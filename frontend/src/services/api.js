const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Make API request
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Admin API methods
export const adminAPI = {
  // Login
  login: async (email, password) => {
    return apiRequest('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Register
  register: async (adminData) => {
    return apiRequest('/admin/register', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  },

  // Get profile
  getProfile: async () => {
    return apiRequest('/admin/profile', {
      method: 'GET',
    });
  },

  // Get all admins
  getAllAdmins: async () => {
    return apiRequest('/admin', {
      method: 'GET',
    });
  },

  // Get admin by ID
  getAdminById: async (id) => {
    return apiRequest(`/admin/${id}`, {
      method: 'GET',
    });
  },

  // Update admin
  updateAdmin: async (id, adminData) => {
    return apiRequest(`/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adminData),
    });
  },

  // Delete admin
  deleteAdmin: async (id) => {
    return apiRequest(`/admin/${id}`, {
      method: 'DELETE',
    });
  },
};

// Project API methods
export const projectAPI = {
  // Get all projects (public)
  getAllProjects: async (isActive = null) => {
    const token = getToken();
    let url = `${API_BASE_URL}/projects`;
    
    // Only add isActive query param if it's explicitly provided
    if (isActive !== null && isActive !== undefined) {
      url += `?isActive=${isActive}`;
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Get project by ID (public)
  getProjectById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Create project (protected)
  createProject: async (projectData, images) => {
    const token = getToken();
    const formData = new FormData();
    
    // Append project data as JSON
    Object.keys(projectData).forEach(key => {
      if (key === 'technologies' || key === 'challenges' || key === 'solutions') {
        formData.append(key, JSON.stringify(projectData[key]));
      } else {
        formData.append(key, projectData[key]);
      }
    });
    
    // Append images
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Update project (protected)
  updateProject: async (id, projectData, images) => {
    const token = getToken();
    const formData = new FormData();
    
    // Append project data
    Object.keys(projectData).forEach(key => {
      const value = projectData[key];
      
      // Skip undefined, null, or empty string values
      if (value === undefined || value === null || value === '') {
        return;
      }
      
      // Handle arrays and objects that need JSON stringification
      if (key === 'technologies' || key === 'challenges' || key === 'solutions' || key === 'deleteImages') {
        // Only stringify if it's an array and has items
        if (Array.isArray(value) && value.length > 0) {
          formData.append(key, JSON.stringify(value));
        }
      } else {
        formData.append(key, value);
      }
    });
    
    // Append new images
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Delete project (protected)
  deleteProject: async (id) => {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

export default apiRequest;

