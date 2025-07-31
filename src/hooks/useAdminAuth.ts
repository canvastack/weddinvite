import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/data/mockUsers';

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const adminUser = localStorage.getItem('adminUser');
        if (adminUser) {
          const userData = JSON.parse(adminUser);
          setUser(userData);
        } else {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('adminUser');
    setUser(null);
    navigate('/admin/login');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout
  };
};