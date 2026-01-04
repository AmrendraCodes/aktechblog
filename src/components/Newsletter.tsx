import { useState } from "react";
import { Mail, ArrowRight, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      // Simulate API call - replace with actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "🎉 Successfully subscribed!",
        description: "Welcome! You'll receive our latest tech articles and updates in your inbox.",
      });

      // Reset form after 3 seconds
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
              <Mail className="h-10 w-10 text-primary" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Get the latest tech articles, tutorials, and insights delivered straight to your inbox. 
              <span className="block text-sm text-muted-foreground/80 mt-2">
                Join 1,000+ developers. No spam, unsubscribe anytime.
              </span>
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-lg mx-auto">
            <form 
              onSubmit={handleSubmit} 
              className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl"
            >
              <div className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="newsletter-email" className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base border-border/50 focus:border-primary focus:ring-primary/20"
                    disabled={isSubmitting || isSubmitted}
                    required
                    aria-describedby={error ? "newsletter-error" : undefined}
                  />
                  {error && (
                    <p id="newsletter-error" className="text-sm text-destructive flex items-center gap-1">
                      {error}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full h-12 text-base font-medium group relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Subscribing...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Subscribed Successfully!
                    </>
                  ) : (
                    <>
                      Subscribe to Newsletter
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                {/* Privacy Note */}
                <p className="text-xs text-muted-foreground/60 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </form>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground/80 mb-4">
              Trusted by developers from leading companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Add company logos or testimonials here */}
              <div className="text-xs font-medium">Google</div>
              <div className="text-xs font-medium">Microsoft</div>
              <div className="text-xs font-medium">Amazon</div>
              <div className="text-xs font-medium">Meta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
