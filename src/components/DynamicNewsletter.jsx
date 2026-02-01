import { lazy, Suspense, useState } from "react";
import "./DynamicNewsletter.css";

// Lazy load newsletter component only when needed
const NewsletterContent = lazy(() => import("./Newsletter"));

export const DynamicNewsletter = () => {
    const [showNewsletter, setShowNewsletter] = useState(false);

    return (
        <div className="dynamic-newsletter-container">
            {!showNewsletter ? (
                <div className="newsletter-trigger-wrapper">
                    <button
                        onClick={() => setShowNewsletter(true)}
                        className="btn-trigger-newsletter"
                    >
                        Subscribe to Newsletter
                    </button>
                </div>
            ) : (
                <Suspense
                    fallback={
                        <div className="newsletter-skeleton">
                            <div className="skeleton-bar-lg" />
                            <div className="skeleton-bar-md" />
                            <div className="skeleton-input" />
                        </div>
                    }
                >
                    <NewsletterContent />
                </Suspense>
            )}
        </div>
    );
};
