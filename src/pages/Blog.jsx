import ArticlesList from '../components/ArticlesList';
import { Link } from 'react-router-dom';
import "./Blog.css";

const Blog = () => {
    return (
        <div className="blog-page">

            {/* Hero Section */}
            <div className="blog-hero">
                {/* Background Effects */}
                <div className="hero-overlay" />
                <div className="shape shape-yellow" />
                <div className="shape shape-pink" />
                <div className="shape shape-blue" />

                {/* Decorative shapes */}
                <div className="decor-box item-bounce" />
                <div className="decor-circle item-spin" />
                <div className="decor-square item-rotate" />

                <div className="blog-hero-content">
                    <div className="hero-inner">

                        {/* Breadcrumb */}
                        <div className="breadcrumb-pill">
                            <Link to="/" className="home-link">
                                🏠 Home
                            </Link>
                            <span className="separator">→</span>
                            <span className="current-page">✨ Blog</span>
                        </div>

                        {/* Heading */}
                        <h1 className="blog-heading">
                            <span className="gradient-heading">
                                Our Amazing Blog
                            </span>
                        </h1>

                        {/* Decorative line */}
                        <div className="heading-decoration">
                            <div className="line-gradient" />
                            <div className="dot-ping" />
                            <div className="line-gradient" />
                        </div>

                        {/* Subtitle */}
                        <p className="blog-subtitle">
                            ✨ Insights, tutorials, and stories from our team 🚀
                        </p>

                        {/* Badges */}
                        <div className="hero-badges">
                            <span className="hero-badge badge-knowledge">
                                📚 Knowledge
                            </span>
                            <span className="hero-badge badge-innovation">
                                💡 Innovation
                            </span>
                            <span className="hero-badge badge-creativity">
                                🎨 Creativity
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Articles List */}
            <div className="blog-main">
                <ArticlesList />
            </div>

            {/* Footer Section */}
            <footer className="blog-footer-section">
                <div className="container blog-footer-container">
                    <div className="blog-footer-grid">

                        {/* About */}
                        <div>
                            <h3 className="footer-col-title gradient-text-footer">
                                Our Blog
                            </h3>
                            <p className="footer-text">
                                Discover insightful articles, tutorials, and stories that inspire and educate. Join our community of readers.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="footer-col-subtitle">Quick Links</h4>
                            <ul className="footer-links-list">
                                <li><Link to="/" className="footer-link-item">Home</Link></li>
                                <li><Link to="/blog" className="footer-link-item">Blog</Link></li>
                                <li><Link to="/about" className="footer-link-item">About</Link></li>
                                <li><Link to="/contact" className="footer-link-item">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Stay Updated */}
                        <div>
                            <h4 className="footer-col-subtitle">Stay Updated</h4>
                            <p className="footer-text-sm">
                                Subscribe to our newsletter for the latest updates and articles.
                            </p>
                            <div className="footer-input-group">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="footer-input"
                                />
                                <button className="footer-btn">
                                    Join
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="blog-footer-bottom">
                        <p className="footer-copy">
                            © 2026 Our Blog. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Blog;
