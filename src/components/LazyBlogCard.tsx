import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/OptimizedImage";

interface BlogCardPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

interface LazyBlogCardProps {
  post: BlogCardPost;
  featured?: boolean;
  priority?: boolean;
}

// Lazy load the full card component
const BlogCardContent = lazy(() => import("./BlogCard"));

export const LazyBlogCard = ({ post, featured = false, priority = false }: LazyBlogCardProps) => {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl card-shadow bg-white p-6 animate-pulse">
          <div className="h-48 bg-gray-200 rounded mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      }
    >
      <BlogCardContent post={post} featured={featured} priority={priority} />
    </Suspense>
  );
};
