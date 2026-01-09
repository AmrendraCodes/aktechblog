import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import AboutInteractive from "./pages/AboutInteractive";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Home */}
          <Route path="/" element={<Index />} />

          {/* Blog List */}
          <Route path="/blog" element={<Blog />} />

          {/* Blog Detail (MUST be before *) */}
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Static Pages */}
          <Route path="/about" element={<AboutInteractive />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Catch-all (ALWAYS LAST) */}
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
