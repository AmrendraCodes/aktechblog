import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import ReadingProgress from "@/components/ReadingProgress";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";

// Calculate reading time based on content
const calculateReadingTime = (content: string): { minutes: number; words: number } => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return { minutes, words };
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const { minutes, words } = calculateReadingTime(post.content);

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  // Simple markdown to HTML conversion
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-4xl font-serif font-bold mb-6 mt-8">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-serif font-semibold mt-10 mb-4">{line.slice(3)}</h2>;
        }
        if (line.startsWith('> ')) {
          return <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">{line.slice(2)}</blockquote>;
        }
        if (line.startsWith('```')) {
          return null;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-6 text-muted-foreground mb-2">{line.slice(2)}</li>;
        }
        if (line.match(/^\d+\. /)) {
          return <li key={index} className="ml-6 text-muted-foreground mb-2 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        // Handle inline code
        const parts = line.split(/`([^`]+)`/);
        if (parts.length > 1) {
          return (
            <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
              {parts.map((part, i) => 
                i % 2 === 1 ? (
                  <code key={i} className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">{part}</code>
                ) : (
                  part
                )
              )}
            </p>
          );
        }
        return <p key={index} className="mb-4 text-muted-foreground leading-relaxed">{line}</p>;
      });
  };

  return (
    <Layout>
      <ReadingProgress />
      
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <Button asChild variant="ghost" className="mb-6 bg-background/80 backdrop-blur">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Article Header */}
          <header className="bg-card rounded-2xl p-6 md:p-10 card-shadow mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                {post.category}
              </Badge>
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            {/* Reading Stats */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                <Clock className="h-4 w-4" />
                {minutes} min read
              </div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                {words.toLocaleString()} words
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-6">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose-blog">
            {renderContent(post.content)}
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-border">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Share2 className="h-4 w-4" />
              Share:
            </span>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>

          {/* Author Card */}
          <div className="mt-12 p-6 bg-muted/50 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white text-xl font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold mb-1">Written by {post.author}</h3>
                <p className="text-sm text-muted-foreground">
                  Tech writer and developer passionate about creating great user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 mt-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;
