import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/Newsletter";
import { getFeaturedPosts, blogPosts } from "@/data/blogPosts";

const Index = () => {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <Layout>
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
          
          {featuredPosts.length === 0 ? (
            <p className="text-center text-foreground/60">No featured posts yet.</p>
          ) : (
            <div className="space-y-8">
              {featuredPosts.slice(0, 2).map((post, idx) => (
                <BlogCard key={post.slug} post={post} featured priority={idx === 0} />
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
          
          {recentPosts.length === 0 ? (
            <p className="text-center text-foreground/60">No articles yet. Please check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post, idx) => (
                <BlogCard key={post.slug} post={post} priority={idx === 0} />
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
      <Newsletter />
    </Layout>
  );
};

export default Index;
