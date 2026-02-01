import { useState } from "react";
import { Send, Mail, MapPin, MessageSquare, Check, Home, FileText, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import "./Contact.css";

const Contact = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        toast({
            title: "Message sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
        });

        // Reset form after delay
        setTimeout(() => {
            setFormData({ name: "", email: "", subject: "", message: "" });
            setIsSubmitted(false);
        }, 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const contactInfo = [
        { icon: Mail, label: "Email", value: "hello@blogify.dev" },
        { icon: MapPin, label: "Location", value: "San Francisco, CA" },
        { icon: MessageSquare, label: "Response Time", value: "Within 24 hours" },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="contact-container">
                    <div className="contact-hero-content">
                        <h1 className="contact-hero-title">
                            Get in Touch
                        </h1>
                        <p className="contact-hero-text">
                            Have a question, feedback, or just want to say hello?
                            I'd love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <div className="contact-container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info-col">
                            <h2 className="contact-section-title">Contact Info</h2>
                            <div className="contact-info-list">
                                {contactInfo.map((item) => (
                                    <div key={item.label} className="contact-info-item">
                                        <div className="contact-icon-box">
                                            <item.icon className="icon-sm" />
                                        </div>
                                        <div>
                                            <p className="contact-info-label">{item.label}</p>
                                            <p className="contact-info-value">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="contact-note">
                                <h3 className="contact-note-title">Quick Note</h3>
                                <p className="contact-note-text">
                                    For collaboration inquiries, please include details about your
                                    project and timeline. For blog-related questions, feel free to
                                    reference specific articles.
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-col">
                            <div className="contact-card">
                                <h2 className="contact-section-title">Send a Message</h2>

                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={errors.name ? "error-input" : ""}
                                            />
                                            {errors.name && (
                                                <p className="error-text">{errors.name}</p>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={errors.email ? "error-input" : ""}
                                            />
                                            {errors.email && (
                                                <p className="error-text">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="How can I help you?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={errors.subject ? "error-input" : ""}
                                        />
                                        {errors.subject && (
                                            <p className="error-text">{errors.subject}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Your message here..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={6}
                                            className={errors.message ? "error-input" : ""}
                                        />
                                        {errors.message && (
                                            <p className="error-text">{errors.message}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={isSubmitting || isSubmitted}
                                        className="contact-submit-btn"
                                    >
                                        {isSubmitted ? (
                                            <>
                                                <Check className="icon-sm mr-2" />
                                                Message Sent!
                                            </>
                                        ) : isSubmitting ? (
                                            <>
                                                <span className="spinner mr-2"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="icon-sm mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="contact-links-section">
                <div className="contact-container">
                    <div className="contact-links-wrapper">
                        <h2 className="links-section-title">
                            Quick Links
                        </h2>
                        <div className="links-grid">
                            <Link to="/" className="quick-link-card group">
                                <div className="link-card-inner">
                                    <Home className="link-icon icon-lg text-blue" />
                                    <h3 className="link-title">Home</h3>
                                    <p className="link-desc">Return to homepage</p>
                                </div>
                            </Link>

                            <Link to="/blog" className="quick-link-card group">
                                <div className="link-card-inner">
                                    <FileText className="link-icon icon-lg text-green" />
                                    <h3 className="link-title">Blog</h3>
                                    <p className="link-desc">Read our articles</p>
                                </div>
                            </Link>

                            <Link to="/about" className="quick-link-card group">
                                <div className="link-card-inner">
                                    <Users className="link-icon icon-lg text-purple" />
                                    <h3 className="link-title">About</h3>
                                    <p className="link-desc">Learn about us</p>
                                </div>
                            </Link>

                            <Link to="/privacy-policy" className="quick-link-card group">
                                <div className="link-card-inner">
                                    <Shield className="link-icon icon-lg text-amber" />
                                    <h3 className="link-title">Privacy</h3>
                                    <p className="link-desc">Privacy policy</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
