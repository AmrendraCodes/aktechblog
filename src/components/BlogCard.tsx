import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl bg-card card-shadow">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent md:hidden" />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {post.category}
                </Badge>
                <Badge variant="outline" className="text-accent border-accent">
                  Featured
                </Badge>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
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
      <article className="overflow-hidden rounded-xl bg-card card-shadow h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <Badge variant="secondary" className="w-fit mb-3 bg-primary/10 text-primary hover:bg-primary/20">
            {post.category}
          </Badge>
          <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
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
