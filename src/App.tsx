import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AboutInteractive from "./pages/AboutInteractive";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const ArticlesList = lazy(() => import("./components/ArticlesList"));
const BlogDetail = lazy(() => import("./components/BlogDetail"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Safe basename with fallback
const getSafeBaseName = () => {
  try {
    return import.meta.env.BASE_URL || '/';
  } catch (error) {
    console.warn('Failed to get BASE_URL, using fallback:', error);
    return '/';
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getSafeBaseName()}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Home / Blog List */}
            <Route path="/" element={<ArticlesList />} />

            {/* Blog Detail Page */}
            <Route path="/blog/:slug" element={<BlogDetail />} />

            {/* Other Pages */}
            <Route path="/about" element={<AboutInteractive />} />
            <Route path="/about-interactive" element={<AboutInteractive />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-6">
                    Page not found
                  </p>
                  <a
                    href="/"
                    className="text-blue-600 font-semibold underline"
                  >
                    Go back to home
                  </a>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
