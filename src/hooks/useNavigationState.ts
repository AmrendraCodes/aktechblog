import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationState {
  isMenuOpen: boolean;
  isDropdownOpen: boolean;
  activePath: string;
}

export const useNavigationState = () => {
  const location = useLocation();
  const [state, setState] = useState<NavigationState>({
    isMenuOpen: false,
    isDropdownOpen: false,
    activePath: location.pathname,
  });

  // Update active path when location changes
  useEffect(() => {
    setState(prev => ({ ...prev, activePath: location.pathname }));
  }, [location.pathname]);

  // Close menus when route changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isMenuOpen: false,
      isDropdownOpen: false,
    }));
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  }, []);

  const toggleDropdown = useCallback(() => {
    setState(prev => ({ ...prev, isDropdownOpen: !prev.isDropdownOpen }));
  }, []);

  const closeAll = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMenuOpen: false,
      isDropdownOpen: false,
    }));
  }, []);

  const openMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: true }));
  }, []);

  const openDropdown = useCallback(() => {
    setState(prev => ({ ...prev, isDropdownOpen: true }));
  }, []);

  return {
    ...state,
    toggleMenu,
    toggleDropdown,
    closeAll,
    openMenu,
    openDropdown,
    isActive: (path: string) => state.activePath === path,
  };
};
