import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationState {
  isMenuOpen: boolean;
  activePath: string;
}

export const useNavigationState = () => {
  const location = useLocation();
  const [state, setState] = useState<NavigationState>({
    isMenuOpen: false,
    activePath: location.pathname,
  });

  // Update active path when location changes
  useEffect(() => {
    setState(prev => ({ ...prev, activePath: location.pathname }));
  }, [location.pathname]);

  // Close menu when route changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isMenuOpen: false,
    }));
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  }, []);

  const closeAll = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMenuOpen: false,
    }));
  }, []);

  const openMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: true }));
  }, []);

  return {
    ...state,
    toggleMenu,
    closeAll,
    openMenu,
    isActive: (path: string) => state.activePath === path,
  };
};
