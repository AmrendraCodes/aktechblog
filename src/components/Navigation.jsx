import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigationState } from "@/hooks/useNavigationState";
import "./Navigation.css";

const Navigation = () => {
    const [isDark, setIsDark] = useState(false);
    const { isMenuOpen, toggleMenu, closeAll, isActive } = useNavigationState();

    useEffect(() => {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setIsDark(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);
        localStorage.setItem("darkMode", String(newDarkMode));
        document.documentElement.classList.toggle("dark");
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" }
    ];

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="navbar-logo"
                        onClick={closeAll}
                    >
                        <span className="logo-text gradient-text">Tech Blog</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={cn(
                                    "nav-item",
                                    isActive(link.href) ? "nav-item-active" : ""
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="navbar-actions">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleDarkMode}
                            className="btn-theme-toggle"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? <Sun className="icon-sm text-accent" /> : <Moon className="icon-sm" />}
                        </Button>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mobile-menu-btn"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="icon-sm" /> : <Menu className="icon-sm" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={cn("mobile-nav-menu", isMenuOpen ? "is-open" : "")} id="mobile-menu">
                    <div className="mobile-nav-list">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={toggleMenu}
                                className={cn(
                                    "mobile-nav-item",
                                    isActive(link.href) ? "mobile-nav-item-active" : ""
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
