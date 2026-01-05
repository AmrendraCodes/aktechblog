import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  currentPage: string;
}

const Breadcrumb = ({ items = [], currentPage }: BreadcrumbProps) => {
  const location = useLocation();

  // Default breadcrumb structure for blog posts
  const breadcrumbItems = items.length > 0 ? items : [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" }
  ];

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center space-x-2 text-sm text-muted-foreground mb-6"
    >
      <Link 
        to="/" 
        className="flex items-center hover:text-primary transition-colors"
        aria-label="Go to home page"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          <Link 
            to={item.href}
            className="hover:text-primary transition-colors"
          >
            {item.label}
          </Link>
        </div>
      ))}
      
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium" aria-current="page">
        {currentPage}
      </span>
    </nav>
  );
};

export default Breadcrumb;
