import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { LazyBlogCard } from "@/components/LazyBlogCard";
import { DynamicNewsletter } from "@/components/DynamicNewsletter";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { fetchArticles, mapArticlesToUi } from "@/lib/strapi";

const Index = () => {
  const [items, setItems] = useState([] as ReturnType<typeof mapArticlesToUi>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const json = await fetchArticles();
        const mapped = mapArticlesToUi(json);
        if (mounted) setItems(mapped);
      } catch (e: any) {
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
      
      {/* Hero Section - Modern Premium Design */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white,transparent,white)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-primary/20 animate-fade-in">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Latest from the blog</span>
              <TrendingUp className="h-4 w-4" />
            </div>
            
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary/90 to-foreground bg-clip-text text-transparent leading-tight">
                AK Tech Blog
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                Discover cutting-edge insights, tutorials, and innovations in software development and technology.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay">
              <Button asChild size="lg" className="group px-8 py-6 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Link to="/blog" className="flex items-center gap-2">
                  Explore Articles
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group px-8 py-6 text-lg border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Link to="/about" className="flex items-center gap-2">
                  About Us
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float-delay" />
      </section>

      {/* Featured Posts - Enhanced Design */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-8 h-0.5 bg-primary" />
                <span className="text-sm font-medium uppercase tracking-wider">Featured</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Featured Posts</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Our most popular and trending articles from the community
              </p>
            </div>
            <Button asChild variant="ghost" className="group hidden lg:flex px-6 py-3 text-lg hover:bg-primary/10 transition-all duration-300">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-96 bg-muted/30 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">{error}</p>
            </div>
          ) : featuredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No featured posts yet.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.slice(0, 2).map((post, idx) => (
                <div key={post.slug} className={`animate-fade-in-up`} style={{ animationDelay: `${idx * 200}ms` }}>
                  <LazyBlogCard key={post.slug} post={post} featured priority={idx === 0} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts - Modern Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-8 h-0.5 bg-primary" />
                <span className="text-sm font-medium uppercase tracking-wider">Latest</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Recent Articles</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Fresh insights and tutorials from our blog
              </p>
            </div>
            <Button asChild variant="ghost" className="group hidden lg:flex px-6 py-3 text-lg hover:bg-primary/10 transition-all duration-300">
              <Link to="/blog" className="flex items-center gap-2">
                Browse All
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 bg-muted/30 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">{error}</p>
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No articles yet. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post, idx) => (
                <div key={post.slug} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <LazyBlogCard key={post.slug} post={post} priority={idx === 0} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center lg:hidden animate-fade-in">
            <Button asChild variant="outline" size="lg" className="group px-8 py-6 text-lg border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <DynamicNewsletter />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
