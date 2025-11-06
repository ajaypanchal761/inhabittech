const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Make API request
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  // Merge headers properly - ensure Authorization and Content-Type are set correctly
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers: headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  let data;
  try {
    data = await response.json();
  } catch {
    // If response is not JSON, throw a more descriptive error
    throw new Error('Invalid response format from server');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
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

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return apiRequest('/admin/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
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

// Team API methods
export const teamAPI = {
  // Get all team members (public)
  getAllTeamMembers: async (isActive = null) => {
    const token = getToken();
    let url = `${API_BASE_URL}/team`;

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

  // Get team member by ID (public)
  getTeamMemberById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/team/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Create team member (protected)
  createTeamMember: async (teamData, image) => {
    const token = getToken();
    const formData = new FormData();

    // Append team data
    Object.keys(teamData).forEach(key => {
      formData.append(key, teamData[key]);
    });

    // Append image
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${API_BASE_URL}/team`, {
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

  // Update team member (protected)
  updateTeamMember: async (id, teamData, image) => {
    const token = getToken();
    const formData = new FormData();

    // Append team data
    Object.keys(teamData).forEach(key => {
      const value = teamData[key];
      // Skip undefined, null, or empty string values
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    // Append new image if provided
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${API_BASE_URL}/team/${id}`, {
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

  // Delete team member (protected)
  deleteTeamMember: async (id) => {
    return apiRequest(`/team/${id}`, {
      method: 'DELETE',
    });
  },
};

// Milestone API methods
export const milestoneAPI = {
  // Get all milestones (public)
  getAllMilestones: async (isActive = null) => {
    const token = getToken();
    let url = `${API_BASE_URL}/milestones`;

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

  // Get milestone by ID (public)
  getMilestoneById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/milestones/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Create milestone (protected)
  createMilestone: async (milestoneData) => {
    return apiRequest('/milestones', {
      method: 'POST',
      body: JSON.stringify(milestoneData),
    });
  },

  // Update milestone (protected)
  updateMilestone: async (id, milestoneData) => {
    return apiRequest(`/milestones/${id}`, {
      method: 'PUT',
      body: JSON.stringify(milestoneData),
    });
  },

  // Delete milestone (protected)
  deleteMilestone: async (id) => {
    return apiRequest(`/milestones/${id}`, {
      method: 'DELETE',
    });
  },
};

// Service API methods
export const serviceAPI = {
  // Get all services (public)
  getAllServices: async (isActive = null) => {
    const token = getToken();
    let url = `${API_BASE_URL}/services`;

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

  // Get service by ID (public)
  getServiceById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Create service (protected)
  createService: async (serviceData) => {
    const token = getToken();
    const isFormData = serviceData instanceof FormData;

    const config = {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Don't set Content-Type for FormData - browser will set it with boundary
        ...(!isFormData && { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? serviceData : JSON.stringify(serviceData),
    };

    const response = await fetch(`${API_BASE_URL}/services`, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Update service (protected)
  updateService: async (id, serviceData) => {
    const token = getToken();
    const isFormData = serviceData instanceof FormData;

    const config = {
      method: 'PUT',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Don't set Content-Type for FormData - browser will set it with boundary
        ...(!isFormData && { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? serviceData : JSON.stringify(serviceData),
    };

    const response = await fetch(`${API_BASE_URL}/services/${id}`, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Delete service (protected)
  deleteService: async (id) => {
    return apiRequest(`/services/${id}`, {
      method: 'DELETE',
    });
  },
};

// Consultation API methods
export const consultationAPI = {
  // Get all consultations (protected - admin only)
  getAllConsultations: async (status = null) => {
    const token = getToken();
    let url = `${API_BASE_URL}/consultations`;

    if (status !== null && status !== undefined) {
      url += `?status=${status}`;
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

  // Get consultation by ID (protected - admin only)
  getConsultationById: async (id) => {
    return apiRequest(`/consultations/${id}`, {
      method: 'GET',
    });
  },

  // Create consultation (public)
  createConsultation: async (consultationData) => {
    const response = await fetch(`${API_BASE_URL}/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultationData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  },

  // Update consultation (protected - admin only)
  updateConsultation: async (id, consultationData) => {
    return apiRequest(`/consultations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(consultationData),
    });
  },

  // Delete consultation (protected - admin only)
  deleteConsultation: async (id) => {
    return apiRequest(`/consultations/${id}`, {
      method: 'DELETE',
    });
  },
};

export default apiRequest;

