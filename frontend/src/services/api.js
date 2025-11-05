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

export default apiRequest;

