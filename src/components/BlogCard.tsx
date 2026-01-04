import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogCardPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  imageData?: any; // Raw image data for debugging
}

interface BlogCardProps {
  post: BlogCardPost;
  featured?: boolean;
  priority?: boolean;
}

const BlogCard = ({ post, featured = false, priority = false }: BlogCardProps) => {
  // Handle image URL with null safety
  const imgSrc = post.image 
    ? post.image.includes("images.unsplash.com")
      ? `${post.image}&fm=webp&q=75&auto=format`
      : post.image
    : '/placeholder.svg'; // Fallback image

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-xl bg-white card-shadow card-hover">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full overflow-hidden image-zoom">
              <img
                src={imgSrc}
                alt={post.title}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent md:hidden" />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-[#f0f0f0] text-black border-0">
                  {post.category}
                </Badge>
                <Badge variant="outline" className="bg-[#f0f0f0] text-black border-0">
                  Featured
                </Badge>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-black mb-3 transition-colors">
                {post.title}
              </h3>
              <p className="text-[#666] mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#888] mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
              <div className="flex items-center gap-2 text-black font-medium group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl bg-white card-shadow card-hover h-full flex flex-col">
        <div className="relative h-48 overflow-hidden image-zoom">
          <img
            src={imgSrc}
            alt={post.title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <Badge variant="secondary" className="w-fit mb-3 bg-[#f0f0f0] text-black border-0">
            {post.category}
          </Badge>
          <h3 className="text-xl font-semibold text-black mb-2 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-[#666] text-base mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-[#888] mt-auto">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
