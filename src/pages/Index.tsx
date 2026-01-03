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
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up opacity-0 stagger-1">
              <Sparkles className="h-4 w-4" />
              Welcome to Blogify
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 animate-fade-up opacity-0 stagger-2">
              Insights on{" "}
              <span className="gradient-text">Development</span>{" "}
              & Design
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up opacity-0 stagger-3">
              Discover tutorials, tips, and insights on web development, design systems, 
              and building great user experiences. Updated weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0 stagger-4">
              <Button asChild size="lg" className="gradient-bg text-white hover:opacity-90 transition-opacity">
                <Link to="/blog">
                  Explore Articles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Featured Posts</h2>
              <p className="text-muted-foreground">Our most popular and trending articles</p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link to="/blog">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-8">
            {featuredPosts.slice(0, 2).map((post) => (
              <BlogCard key={post.slug} post={post} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Recent Articles</h2>
              <p className="text-muted-foreground">The latest from our blog</p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link to="/blog">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

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
