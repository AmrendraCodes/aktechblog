import { Link } from "react-router-dom";
import { Code, Palette, Lightbulb, ArrowRight, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const About = () => {
  const skills = [
    { icon: Code, title: "Development", description: "React, TypeScript, Node.js, and modern web technologies" },
    { icon: Palette, title: "Design", description: "UI/UX design, design systems, and accessibility" },
    { icon: Lightbulb, title: "Strategy", description: "Product thinking, user research, and technical architecture" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@blogify.dev", label: "Email" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up opacity-0 stagger-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                About Me
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Hi, I'm <span className="gradient-text">Sarah Chen</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                I'm a full-stack developer and designer with over 8 years of experience 
                building digital products. I write about web development, design systems, 
                and creating great user experiences.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                When I'm not coding, you'll find me exploring new coffee shops, 
                reading about technology, or contributing to open-source projects.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="gradient-bg">
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/blog">Read My Blog</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-up opacity-0 stagger-2">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop"
                  alt="Sarah Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What I Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I combine technical expertise with a keen eye for design to create 
              products that are both beautiful and functional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                className="bg-card rounded-2xl p-8 card-shadow text-center animate-fade-up opacity-0"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-6">
                  <skill.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">
              My Story
            </h2>
            <div className="prose-blog space-y-6">
              <p className="text-lg text-muted-foreground">
                My journey into tech started in college when I built my first website 
                for a local business. Since then, I've worked with startups and Fortune 500 
                companies, helping them build products that users love.
              </p>
              <p className="text-lg text-muted-foreground">
                I started this blog to share what I've learned along the way. From the 
                technical intricacies of modern frameworks to the soft skills needed to 
                succeed in tech, I aim to provide practical insights that help developers 
                at all levels.
              </p>
              <p className="text-lg text-muted-foreground">
                I believe in writing code that's not just functional, but also maintainable 
                and accessible. Every article I write is grounded in real-world experience 
                and designed to help you become a better developer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Let's Connect
            </h2>
            <p className="text-muted-foreground mb-8">
              Follow me on social media or reach out directly. I love hearing from readers!
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-card card-shadow text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
