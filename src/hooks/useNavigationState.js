import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigationState = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
        setIsMenuOpen(false); // Close menu on route change
    }, [location.pathname]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeAll = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const openMenu = useCallback(() => {
        setIsMenuOpen(true);
    }, []);

    const isActive = (path) => {
        if (path === '/') return activePath === '/';
        return activePath.startsWith(path);
    };

    return {
        isMenuOpen,
        activePath,
        toggleMenu,
        closeAll,
        openMenu,
        isActive,
    };
};
