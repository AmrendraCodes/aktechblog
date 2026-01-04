import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigationState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeAll = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const isActive = useCallback((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  return {
    isMenuOpen,
    toggleMenu,
    closeAll,
    isActive
  };
};
