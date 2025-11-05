import { createContext, useContext, useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if admin is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      fetchAdminProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch admin profile
  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await adminAPI.getProfile();
      setAdmin(response.data.admin);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await adminAPI.login(email, password);
      if (response.data && response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        setAdmin(response.data.admin);
        setIsAuthenticated(true);
        return { success: true, data: response.data };
      }
      throw new Error('Invalid response from server');
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const value = {
    admin,
    loading,
    isAuthenticated,
    login,
    logout,
    fetchAdminProfile,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

