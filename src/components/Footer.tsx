import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" }
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-serif font-bold gradient-text">
              Tech Blog
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Sharing insights on web development, design, and technology. 
              Join our community of developers and designers.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://twitter.com/yourhandle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@yourblog.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/blog?category=Development" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Development
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog?category=Design" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog?category=Tutorial" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog?category=News" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tech Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;