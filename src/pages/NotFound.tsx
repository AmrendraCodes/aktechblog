import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, FileText, Users, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Oops! Page not found</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Go to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/blog" className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Browse Blog
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
            <Link to="/" className="group flex flex-col items-center p-4 rounded-lg bg-card hover:bg-accent transition-colors">
              <Home className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link to="/blog" className="group flex flex-col items-center p-4 rounded-lg bg-card hover:bg-accent transition-colors">
              <FileText className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Blog</span>
            </Link>
            <Link to="/about" className="group flex flex-col items-center p-4 rounded-lg bg-card hover:bg-accent transition-colors">
              <Users className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">About</span>
            </Link>
            <Link to="/contact" className="group flex flex-col items-center p-4 rounded-lg bg-card hover:bg-accent transition-colors">
              <Mail className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
