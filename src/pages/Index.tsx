import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, Calendar, TrendingUp, BookOpen, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { LazyBlogCard } from "@/components/LazyBlogCard";
import { DynamicNewsletter } from "@/components/DynamicNewsletter";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { fetchArticles, mapArticlesToUi } from "@/lib/strapi";

const Index = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const json = await fetchArticles();
        const mapped = mapArticlesToUi(json);
        if (mounted) setItems(mapped);
      } catch (e) {
        if (mounted) setError(e?.message || "Failed to load articles");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const featuredPosts = items.slice(0, 2);
  const recentPosts = items.slice(0, 6);

  return (
    <Layout>
      <PerformanceMonitor />
      
      {/* Hero Section - Beautiful & Responsive */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246 / 0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-full text-sm font-medium shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Welcome to AK Tech Blog</span>
              <TrendingUp className="h-4 w-4" />
            </div>
            
            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Discover Amazing
                </span>
                <br />
                <span className="text-gray-900">Tech Content</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                Explore cutting-edge tutorials, insights, and innovations in software development and technology.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4">
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">100+</div>
                <div className="text-sm sm:text-base text-gray-600">Articles</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-sm sm:text-base text-gray-600">Readers</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-sm sm:text-base text-gray-600">Updates</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button asChild size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <Link to="/blog" className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Explore Articles</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 group">
                <Link to="/about" className="flex items-center gap-2">
                  <Users className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>About Us</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Beautiful Cards */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Why Choose Our Blog?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We provide high-quality, practical content that helps developers grow their skills.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Latest Tech</h3>
              <p className="text-gray-600 leading-relaxed">Stay updated with the latest trends and technologies in software development.</p>
            </div>
            
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">In-Depth Tutorials</h3>
              <p className="text-gray-600 leading-relaxed">Comprehensive guides and tutorials with real-world examples and best practices.</p>
            </div>
            
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">Join a growing community of developers sharing knowledge and experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="w-8 h-0.5 bg-blue-600" />
                <span className="text-sm font-medium uppercase tracking-wider">Featured</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Featured Posts</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                Our most popular and trending articles from the community
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden lg:flex px-6 py-3 text-lg text-blue-600 hover:bg-blue-50 transition-colors">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-80 sm:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">{error}</p>
            </div>
          ) : featuredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No featured posts yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {featuredPosts.slice(0, 2).map((post, idx) => (
                <LazyBlogCard key={post.slug} post={post} featured priority={idx === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-600">
                <div className="w-8 h-0.5 bg-purple-600" />
                <span className="text-sm font-medium uppercase tracking-wider">Latest</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Recent Articles</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                Fresh insights and tutorials from our blog
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden lg:flex px-6 py-3 text-lg text-purple-600 hover:bg-purple-50 transition-colors">
              <Link to="/blog" className="flex items-center gap-2">
                Browse All
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 sm:h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">{error}</p>
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No articles yet. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post, idx) => (
                <LazyBlogCard key={post.slug} post={post} priority={idx === 0} />
              ))}
            </div>
          )}

          <div className="mt-12 sm:mt-16 text-center lg:hidden">
            <Button asChild variant="outline" size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <DynamicNewsletter />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
