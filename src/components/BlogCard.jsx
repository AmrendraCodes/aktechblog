import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import "./BlogCard.css";

const BlogCard = ({ post, featured = false }) => {
    const imageUrl = post.cover?.url
        ? `http://localhost:1337${post.cover.url}`
        : "/placeholder.png"; // You might need a real placeholder path

    return (
        <div className={`blog-card ${featured ? "blog-card-featured" : ""}`}>
            <div className="blog-card-image-wrapper">
                <img
                    src={imageUrl}
                    alt={post.cover?.alternativeText || post.Title}
                    className="blog-card-image"
                />
            </div>

            <div className="blog-card-content">
                <h3 className="blog-card-title">
                    {post.Title}
                </h3>

                <div className="blog-card-meta">
                    <Calendar className="icon-xs" />
                    {new Date(post.publishedAt).toDateString()}
                </div>

                <Link
                    to={`/blog/${post.slug}`}
                    className="blog-card-link"
                >
                    Read More <ArrowRight className="icon-xs" />
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
