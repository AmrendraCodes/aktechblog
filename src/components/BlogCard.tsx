import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const BlogCard = ({ post, featured = false }: any) => {
  const imageUrl = post.cover?.url
    ? `http://localhost:1337${post.cover.url}`
    : "/placeholder.png";

  return (
    <div className={`rounded-xl overflow-hidden bg-slate-800 shadow-lg hover:shadow-2xl transition ${featured ? "md:col-span-2" : ""}`}>
      <img
        src={imageUrl}
        alt={post.cover?.alternativeText || post.Title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">
          {post.Title}
        </h3>

        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <Calendar className="h-4 w-4" />
          {new Date(post.publishedAt).toDateString()}
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:underline"
        >
          Read More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
