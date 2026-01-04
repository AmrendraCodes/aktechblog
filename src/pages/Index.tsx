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
      
      {/* Hero Section - Clean Professional Design */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Latest from the blog</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                AK Tech Blog
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover cutting-edge insights, tutorials, and innovations in software development and technology.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="px-8 py-6 text-lg">
                <Link to="/blog" className="flex items-center gap-2">
                  Explore Articles
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
                <Link to="/about" className="flex items-center gap-2">
                  About Us
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-8 h-0.5 bg-primary" />
                <span className="text-sm font-medium uppercase tracking-wider">Featured</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Posts</h2>
              <p className="text-muted-foreground max-w-2xl">
                Our most popular and trending articles from the community
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden lg:flex px-6 py-3 text-lg">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-96 bg-muted/30 rounded-2xl animate-pulse" />
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
                <LazyBlogCard key={post.slug} post={post} featured priority={idx === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-8 h-0.5 bg-primary" />
                <span className="text-sm font-medium uppercase tracking-wider">Latest</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Recent Articles</h2>
              <p className="text-muted-foreground max-w-2xl">
                Fresh insights and tutorials from our blog
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden lg:flex px-6 py-3 text-lg">
              <Link to="/blog" className="flex items-center gap-2">
                Browse All
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 bg-muted/30 rounded-2xl animate-pulse" />
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
                <LazyBlogCard key={post.slug} post={post} priority={idx === 0} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center lg:hidden">
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <DynamicNewsletter />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
