import { useState, useMemo, useEffect } from "react";
import { Search, Home, Users, Mail, Shield, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { LazyBlogCard } from "@/components/LazyBlogCard";
import { fetchArticles, mapArticlesToUi } from "@/lib/strapi";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [items, setItems] = useState([] as ReturnType<typeof mapArticlesToUi>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const json = await fetchArticles(); // uses populate=*
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

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach(p => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filteredPosts = useMemo(() => {
    return items.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        false; // no tags field in mapped UI; keep search simple
      
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, items]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore articles on development, design, and everything in between.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Posts */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className=""
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl card-shadow bg-white p-6 skeleton" style={{height: 280}} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-xl text-foreground/70 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, idx) => (
                <LazyBlogCard key={post.slug} post={post} priority={idx < 3} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-foreground/70 mb-4">No articles found</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-center mb-12">
              Explore More
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link to="/" className="group">
                <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Home className="h-8 w-8 mx-auto mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Home</h3>
                  <p className="text-sm text-muted-foreground">Return to homepage</p>
                </div>
              </Link>

              <Link to="/about" className="group">
                <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Users className="h-8 w-8 mx-auto mb-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">Learn about us</p>
                </div>
              </Link>

              <Link to="/blog" className="group">
                <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <FileText className="h-8 w-8 mx-auto mb-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Blog</h3>
                  <p className="text-sm text-muted-foreground">Read our articles</p>
                </div>
              </Link>

              <Link to="/contact" className="group">
                <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Mail className="h-8 w-8 mx-auto mb-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <p className="text-sm text-muted-foreground">Get in touch</p>
                </div>
              </Link>

              <Link to="/privacy-policy" className="group">
                <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Shield className="h-8 w-8 mx-auto mb-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Privacy</h3>
                  <p className="text-sm text-muted-foreground">Privacy policy</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
