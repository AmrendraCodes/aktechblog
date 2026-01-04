import { lazy, Suspense, useState } from "react";

// Lazy load newsletter component only when needed
const NewsletterContent = lazy(() => import("./Newsletter").then(module => ({ default: module.default })));

export const DynamicNewsletter = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <div className="py-16">
      {!showNewsletter ? (
        <div className="container mx-auto px-4 text-center">
          <button
            onClick={() => setShowNewsletter(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Subscribe to Newsletter
          </button>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto p-6 bg-white rounded-xl card-shadow animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </div>
          }
        >
          <NewsletterContent />
        </Suspense>
      )}
    </div>
  );
};
