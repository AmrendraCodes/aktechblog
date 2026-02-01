import { Link } from "react-router-dom";
import { Shield, Eye, Cookie, Database, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
    const lastUpdated = "January 5, 2026";

    const renderSection = (icon, title, content) => (
        <div className="privacy-card">
            <div className="privacy-card-header">
                <div className={`privacy-icon-box ${title.toLowerCase().includes("collect") ? "bg-blue" : title.toLowerCase().includes("use") ? "bg-green" : title.toLowerCase().includes("cookies") ? "bg-amber" : title.toLowerCase().includes("protection") ? "bg-purple" : "bg-red"}`}>
                    {icon}
                </div>
                <h2 className="privacy-card-title">{title}</h2>
            </div>
            <div className="privacy-card-content">
                {content}
            </div>
        </div>
    );

    return (
        <Layout>
            {/* Hero Section */}
            <section className="privacy-hero">
                <div className="privacy-container">
                    <div className="privacy-hero-content">
                        <div className="privacy-hero-icon">
                            <Shield className="icon-lg" />
                        </div>
                        <h1 className="privacy-hero-title">
                            Privacy Policy
                        </h1>
                        <p className="privacy-hero-text">
                            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                        </p>
                        <p className="privacy-updated">
                            Last updated: {lastUpdated}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="privacy-content-section">
                <div className="privacy-container">
                    <div className="privacy-cards-wrapper">

                        {/* Cards */}
                        {renderSection(
                            <Eye className="icon-md" />,
                            "Information We Collect",
                            <>
                                <p>We collect information you provide directly to us, such as when you:</p>
                                <ul>
                                    <li>Subscribe to our newsletter</li>
                                    <li>Contact us through our contact form</li>
                                    <li>Leave comments on our blog posts</li>
                                    <li>Sign up for our services</li>
                                </ul>
                                <p className="font-semibold mt-4">Information includes:</p>
                                <ul>
                                    <li>Name and email address</li>
                                    <li>Messages and comments</li>
                                    <li>Website URL (if provided)</li>
                                </ul>
                            </>
                        )}

                        {renderSection(
                            <Database className="icon-md" />,
                            "How We Use Your Information",
                            <>
                                <p>We use the information we collect to:</p>
                                <ul>
                                    <li>Respond to your inquiries and provide support</li>
                                    <li>Send you our newsletter (if subscribed)</li>
                                    <li>Improve our website and services</li>
                                    <li>Analyze website traffic and user behavior</li>
                                    <li>Personalize your experience on our site</li>
                                </ul>
                            </>
                        )}

                        {renderSection(
                            <Cookie className="icon-md" />,
                            "Cookies and Tracking",
                            <>
                                <p>
                                    We use cookies and similar tracking technologies to track activity on our website
                                    and hold certain information.
                                </p>
                                <p className="font-semibold">Types of cookies we use:</p>
                                <ul>
                                    <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                                    <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
                                    <li><strong>Functional cookies:</strong> Enable enhanced functionality and personalization</li>
                                </ul>
                            </>
                        )}

                        {renderSection(
                            <User className="icon-md" />,
                            "Data Protection",
                            <>
                                <p>
                                    We implement appropriate security measures to protect your personal information
                                    against unauthorized access, alteration, disclosure, or destruction.
                                </p>
                                <p>
                                    Your data is stored on secure servers and we limit access to personal information
                                    to employees who need to know that information in order to process it on our behalf.
                                </p>
                            </>
                        )}

                        {renderSection(
                            <Mail className="icon-md" />,
                            "Third-Party Services",
                            <>
                                <p>We use third-party services to help us operate our website, including:</p>
                                <ul>
                                    <li>Email marketing services (for newsletter delivery)</li>
                                    <li>Analytics services (to understand website usage)</li>
                                    <li>Content delivery networks (to improve website performance)</li>
                                </ul>
                                <p>
                                    These third-party services have their own privacy policies and we encourage you
                                    to review them.
                                </p>
                            </>
                        )}

                        {/* Your Rights */}
                        <div className="privacy-card">
                            <h2 className="privacy-card-title simple">Your Rights</h2>
                            <div className="privacy-card-content">
                                <p>You have the right to:</p>
                                <ul>
                                    <li>Access and update your personal information</li>
                                    <li>Request deletion of your personal information</li>
                                    <li>Opt-out of marketing communications</li>
                                    <li>Object to processing of your personal information</li>
                                </ul>
                                <p>To exercise these rights, please contact us using the information provided below.</p>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="privacy-card">
                            <h2 className="privacy-card-title simple">Contact Us</h2>
                            <div className="privacy-card-content">
                                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                                <div className="privacy-contact-box">
                                    <p><strong>Email:</strong> amrendra1999official@gmail.com</p>
                                    <p><strong>Contact Form:</strong> <Link to="/contact" className="text-primary link-hover">Visit our contact page</Link></p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="privacy-nav">
                            <p className="nav-label">Ready to explore more of our content?</p>
                            <div className="privacy-nav-buttons">
                                <Link to="/">
                                    <Button variant="outline">Back to Home</Button>
                                </Link>
                                <Link to="/blog">
                                    <Button variant="outline">Read Our Blog</Button>
                                </Link>
                                <Link to="/about">
                                    <Button variant="outline">About Us</Button>
                                </Link>
                                <Link to="/contact">
                                    <Button variant="outline">Get in Touch</Button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PrivacyPolicy;
