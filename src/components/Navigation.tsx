import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigationState } from "@/hooks/useNavigationState";

const Navigation = () => {
  const [isDark, setIsDark] = useState(false);
  const { isMenuOpen, isDropdownOpen, toggleMenu, toggleDropdown, closeAll, isActive } = useNavigationState();
  const location = useLocation();
  const navigate = useNavigate();

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
    {
      href: "/",
      label: "Home"
    },
    {
      href: "/blog",
      label: "Blog"
    },
    {
      href: "/about",
      label: "About"
    },
    {
      href: "/contact",
      label: "Contact"
    }
  ];

  const quickLinks = [
    {
      href: "/blog?category=Development",
      label: "Development"
    },
    {
      href: "/blog?category=Design",
      label: "Design"
    },
    {
      href: "/blog?category=Tutorial",
      label: "Tutorials"
    },
    {
      href: "/blog?category=News",
      label: "News"
    }
  ];

  const handleLinkClick = (href: string) => {
    closeAll();
    navigate(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={closeAll}
          >
            <span className="text-2xl font-serif font-bold gradient-text">Tech Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "nav-link text-sm font-medium transition-colors hover:text-primary",
                  isActive(link.href) ? "nav-link-active text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Quick Links Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-sm font-medium"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Quick Links
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {isDropdownOpen && (
                <div className="dropdown-content absolute top-full left-0 mt-1 w-48 animate-fade-in">
                  <div className="py-2">
                    {quickLinks.map(link => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                        onClick={() => toggleDropdown()}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="rounded-full"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5 text-accent" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav 
            id="mobile-menu"
            className="mobile-nav md:hidden py-4 border-t border-border mobile-menu-enter"
          >
            <div className="space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={toggleMenu}
                  className={cn(
                    "mobile-nav-link block py-3 px-4 text-sm font-medium transition-colors",
                    isActive(link.href) 
                      ? "mobile-nav-link active text-primary bg-accent" 
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Quick Links */}
              <div className="pt-4 mt-4 border-t border-border">
                <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Quick Links
                </h4>
                {quickLinks.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={toggleMenu}
                    className="block py-2 px-4 text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
