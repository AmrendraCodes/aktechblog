import { Link } from "react-router-dom";
import { Shield, Eye, Cookie, Database, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  const lastUpdated = "January 5, 2026";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto mb-6">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Information We Collect */}
            <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Eye className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold">Information We Collect</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us through our contact form</li>
                  <li>Leave comments on our blog posts</li>
                  <li>Sign up for our services</li>
                </ul>
                
                <p className="font-semibold text-foreground mt-4">Information includes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and email address</li>
                  <li>Messages and comments</li>
                  <li>Website URL (if provided)</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Database className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respond to your inquiries and provide support</li>
                  <li>Send you our newsletter (if subscribed)</li>
                  <li>Improve our website and services</li>
                  <li>Analyze website traffic and user behavior</li>
                  <li>Personalize your experience on our site</li>
                </ul>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Cookie className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold">Cookies and Tracking</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar tracking technologies to track activity on our website 
                  and hold certain information. Cookies are files with small amount of data which may 
                  include an anonymous unique identifier.
                </p>
                
                <p className="font-semibold text-foreground">Types of cookies we use:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functional cookies:</strong> Enable enhanced functionality and personalization</li>
                </ul>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold">Data Protection</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
                
                <p>
                  Your data is stored on secure servers and we limit access to personal information 
                  to employees who need to know that information in order to process it on our behalf.
                </p>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold">Third-Party Services</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use third-party services to help us operate our website, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email marketing services (for newsletter delivery)</li>
                  <li>Analytics services (to understand website usage)</li>
                  <li>Content delivery networks (to improve website performance)</li>
                </ul>
                
                <p>
                  These third-party services have their own privacy policies and we encourage you 
                  to review them.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              <h2 className="text-2xl font-serif font-bold mb-6">Your Rights</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to processing of your personal information</li>
                </ul>
                
                <p>
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              <h2 className="text-2xl font-serif font-bold mb-6">Contact Us</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p><strong>Email:</strong> amrendra1999official@gmail.com</p>
                  <p><strong>Contact Form:</strong> <Link to="/contact" className="text-primary hover:underline">Visit our contact page</Link></p>
                </div>
              </div>
            </div>

            {/* Policy Updates */}
            <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow">
              <h2 className="text-2xl font-serif font-bold mb-6">Policy Updates</h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update this privacy policy from time to time. We will notify you of any 
                  changes by posting the new privacy policy on this page and updating the "last updated" date.
                </p>
                
                <p>
                  You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="text-center space-y-4 pt-8">
              <p className="text-muted-foreground">
                Ready to explore more of our content?
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/blog">Read Our Blog</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/about">About Us</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
