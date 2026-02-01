import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import "./Footer.css";

const Footer = () => {
    const footerLinks = [
        { href: "/", label: "Home" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy-policy", label: "Privacy Policy" }
    ];

    return (
        <footer className="footer-section">
            <div className="container footer-container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo gradient-text">
                            Tech Blog
                        </Link>
                        <p className="footer-desc">
                            Sharing insights on web development, design, and technology.
                            Join our community of developers and designers.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link" aria-label="Twitter">
                                <Twitter className="icon-sm" />
                            </a>
                            <a href="#" className="social-link" aria-label="GitHub">
                                <Github className="icon-sm" />
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <Linkedin className="icon-sm" />
                            </a>
                            <a href="#" className="social-link" aria-label="Email">
                                <Mail className="icon-sm" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul className="footer-list">
                            {footerLinks.map(link => (
                                <li key={link.href}>
                                    <Link to={link.href} className="footer-link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-column">
                        <h3 className="footer-title">Categories</h3>
                        <ul className="footer-list">
                            <li><Link to="/blog?category=Development" className="footer-link">Development</Link></li>
                            <li><Link to="/blog?category=Design" className="footer-link">Design</Link></li>
                            <li><Link to="/blog?category=Tutorial" className="footer-link">Tutorials</Link></li>
                            <li><Link to="/blog?category=News" className="footer-link">News</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Tech Blog. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
