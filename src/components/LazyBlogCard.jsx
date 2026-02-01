import { lazy, Suspense } from "react";
// import "./LazyBlogCard.css"; // Optional if we had specific styles for the skeleton wrapper

// Lazy load the full card component
const BlogCardContent = lazy(() => import("./BlogCard"));

export const LazyBlogCard = ({ post, featured = false, priority = false }) => {
    return (
        <Suspense
            fallback={
                <div className="skeleton-card-fallback">
                    <div className="skeleton-image" />
                    <div className="skeleton-text-lg" />
                    <div className="skeleton-text-sm" />
                </div>
            }
        >
            <BlogCardContent post={post} featured={featured} />
        </Suspense>
    );
};

// We can add the fallback CSS here or in index.css or LazyBlogCard.css
// I'll assume global CSS or create LazyBlogCard.css for completeness
