import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigationState } from "@/hooks/useNavigationState";

const Navigation = () => {
  const [isDark, setIsDark] = useState(false);
  const { isMenuOpen, toggleMenu, closeAll, isActive } = useNavigationState();
  const location = useLocation();

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
      href: "/articles",  // ✅ Fix: Changed from "/blog" to "/articles"
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
