import { useState } from "react";
import { Mail, ArrowRight, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import "./Newsletter.css";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const { toast } = useToast();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsSubmitted(true);
            toast({
                title: "🎉 Successfully subscribed!",
                description: "Welcome! You'll receive our latest tech articles and updates in your inbox.",
            });

            setTimeout(() => {
                setIsSubmitted(false);
                setEmail("");
                setError("");
            }, 3000);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            toast({
                title: "Subscription failed",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-bg-decor">
                <div className="decor-circle decor-1" />
                <div className="decor-circle decor-2" />
                <div className="decor-circle decor-3" />
            </div>

            <div className="container newsletter-content-wrapper">
                <div className="newsletter-header">
                    <div className="newsletter-icon-box">
                        <Mail className="icon-lg text-primary" />
                    </div>

                    <h2 className="newsletter-title">
                        Subscribe to Our Newsletter
                    </h2>

                    <p className="newsletter-description">
                        Get the latest tech articles, tutorials, and insights delivered straight to your inbox.
                        <span className="newsletter-subtext">
                            Join 1,000+ developers. No spam, unsubscribe anytime.
                        </span>
                    </p>
                </div>

                <div className="newsletter-form-wrapper">
                    <form onSubmit={handleSubmit} className="newsletter-form">
                        <div className="form-group">
                            <label htmlFor="newsletter-email" className="form-label">
                                Email Address
                            </label>
                            <Input
                                id="newsletter-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-newsletter"
                                disabled={isSubmitting || isSubmitted}
                                required
                            />
                            {error && (
                                <p className="form-error">
                                    {error}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting || isSubmitted}
                            className="btn-newsletter-submit"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="spinner mr-2" />
                                    Subscribing...
                                </>
                            ) : isSubmitted ? (
                                <>
                                    <Check className="icon-sm mr-2" />
                                    Subscribed Successfully!
                                </>
                            ) : (
                                <>
                                    Subscribe to Newsletter
                                    <ArrowRight className="icon-sm ml-2" />
                                </>
                            )}
                        </Button>

                        <p className="privacy-note">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </form>
                </div>

                <div className="social-proof">
                    <p className="social-proof-text">
                        Trusted by developers from leading companies
                    </p>
                    <div className="social-proof-logos">
                        <div className="logo-text">Google</div>
                        <div className="logo-text">Microsoft</div>
                        <div className="logo-text">Amazon</div>
                        <div className="logo-text">Meta</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
