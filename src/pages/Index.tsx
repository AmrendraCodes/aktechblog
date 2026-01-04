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
      
      {/* Hero Section - Ultra Simple */}
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Welcome to AK Tech Blog</span>
              <TrendingUp className="h-4 w-4" />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Discover Amazing
                <br />
                Tech Content
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore cutting-edge tutorials, insights, and innovations in software development and technology.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-600">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-gray-600">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">24/7</div>
                <div className="text-sm text-gray-600">Updates</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/blog" className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Explore Articles
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-2 border-gray-300 hover:bg-gray-50">
                <Link to="/about" className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  About Us
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Blog?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide high-quality, practical content that helps developers grow their skills.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Latest Tech</h3>
              <p className="text-gray-600">Stay updated with the latest trends and technologies in software development.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">In-Depth Tutorials</h3>
              <p className="text-gray-600">Comprehensive guides and tutorials with real-world examples and best practices.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">Join a growing community of developers sharing knowledge and experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="w-8 h-0.5 bg-blue-600" />
                <span className="text-sm font-medium uppercase tracking-wider">Featured</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Featured Posts</h2>
              <p className="text-gray-600 max-w-2xl">
                Our most popular and trending articles from the community
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden lg:flex px-6 py-3 text-lg text-blue-600 hover:bg-blue-50">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
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
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.slice(0, 2).map((post, idx) => (
                <LazyBlogCard key={post.slug} post={post} featured priority={idx === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-600">
                <div className="w-8 h-0.5 bg-purple-600" />
                <span className="text-sm font-medium uppercase tracking-wider">Latest</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Recent Articles</h2>
              <p className="text-gray-600 max-w-2xl">
                Fresh insights and tutorials from our blog
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden lg:flex px-6 py-3 text-lg text-purple-600 hover:bg-purple-50">
              <Link to="/blog" className="flex items-center gap-2">
                Browse All
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post, idx) => (
                <LazyBlogCard key={post.slug} post={post} priority={idx === 0} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center lg:hidden">
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-2 border-gray-300 hover:bg-gray-50">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <DynamicNewsletter />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
