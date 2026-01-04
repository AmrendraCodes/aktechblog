import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
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
        const json = await fetchArticles(); // populate=*
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
      {/* Performance Monitor - tracks Core Web Vitals */}
      <PerformanceMonitor />
      
      {/* Hero Section (Clean) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" /> Latest from the blog
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">AK Tech Blog</h1>
            <p className="text-base md:text-lg text-foreground/70 mb-6">
              Articles, tutorials, and insights on software and technology. Simple, fast, and readable on every device.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/blog">
                  Explore Articles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">About</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-1">Featured Posts</h2>
              <p className="text-foreground/70">Our most popular and trending articles</p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link to="/blog">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="rounded-xl card-shadow bg-white p-6 skeleton" style={{height: 220}} />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-foreground/60">{error}</p>
          ) : featuredPosts.length === 0 ? (
            <p className="text-center text-foreground/60">No featured posts yet.</p>
          ) : (
            <div className="space-y-8">
              {featuredPosts.slice(0, 2).map((post, idx) => (
                <LazyBlogCard key={post.slug} post={post} featured priority={idx === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-1">Recent Articles</h2>
              <p className="text-foreground/70">The latest from our blog</p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link to="/blog">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl card-shadow bg-white p-6 skeleton" style={{height: 280}} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-foreground/60">{error}</div>
          ) : recentPosts.length === 0 ? (
            <p className="text-center text-foreground/60">No articles yet. Please check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post, idx) => (
                <LazyBlogCard key={post.slug} post={post} priority={idx === 0} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline">
              <Link to="/blog">
                View All Articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <DynamicNewsletter />
    </Layout>
  );
};

export default Index;
