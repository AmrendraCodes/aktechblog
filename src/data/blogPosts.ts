export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-with-react",
    title: "Getting Started with React in 2024",
    excerpt: "A comprehensive guide to building modern web applications with React, covering hooks, state management, and best practices.",
    content: `
# Getting Started with React in 2024

React continues to be one of the most popular JavaScript libraries for building user interfaces. In this guide, we'll explore the fundamentals and best practices for modern React development.

## Why React?

React's component-based architecture makes it easy to build reusable UI components. With the introduction of hooks, managing state and side effects has become more intuitive than ever.

## Setting Up Your First Project

Getting started with React is straightforward. You can use Vite for a fast development experience:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
\`\`\`

## Understanding Components

Components are the building blocks of React applications. They can be as simple as a button or as complex as an entire page.

> "The best way to learn React is by building projects." - A wise developer

## Hooks: The Modern Way

Hooks like \`useState\` and \`useEffect\` have revolutionized how we write React components. They allow you to use state and other React features without writing a class.

## Conclusion

React's ecosystem is vast and constantly evolving. Start with the basics, build projects, and gradually explore more advanced concepts.
    `,
    author: "Sarah Chen",
    date: "2024-01-15",
    category: "Development",
    tags: ["React", "JavaScript", "Tutorial"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "design-systems-guide",
    title: "Building Scalable Design Systems",
    excerpt: "Learn how to create and maintain a design system that scales with your team and product.",
    content: `
# Building Scalable Design Systems

Design systems are essential for maintaining consistency across large applications. Let's explore how to build one that scales.

## What is a Design System?

A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.

## Key Components

1. **Color Palette** - Define your brand colors and their variations
2. **Typography** - Set up font families, sizes, and weights
3. **Spacing** - Create a consistent spacing scale
4. **Components** - Build reusable UI components

## Best Practices

- Document everything
- Version your components
- Test across different contexts
- Gather feedback from your team

## Tools to Consider

Popular tools for building design systems include Figma, Storybook, and Tailwind CSS.
    `,
    author: "Marcus Rodriguez",
    date: "2024-01-10",
    category: "Design",
    tags: ["Design Systems", "UI/UX", "Tailwind"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices for 2024",
    excerpt: "Master TypeScript with these essential tips and patterns that will level up your code quality.",
    content: `
# TypeScript Best Practices for 2024

TypeScript has become the standard for building large-scale JavaScript applications. Here are the best practices you should follow.

## Use Strict Mode

Always enable strict mode in your tsconfig.json for the best type checking experience.

## Prefer Interfaces Over Types

For object shapes, interfaces are generally more readable and extensible.

## Leverage Utility Types

TypeScript provides powerful utility types like \`Partial\`, \`Pick\`, and \`Omit\` that can save you time.

## Type Your API Responses

Always create types for your API responses to catch errors early.
    `,
    author: "Sarah Chen",
    date: "2024-01-05",
    category: "Development",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    readTime: "7 min read",
  },
  {
    slug: "tailwind-css-tips",
    title: "10 Tailwind CSS Tips You Need to Know",
    excerpt: "Boost your productivity with these lesser-known Tailwind CSS features and techniques.",
    content: `
# 10 Tailwind CSS Tips You Need to Know

Tailwind CSS has transformed how we style web applications. Here are some tips to get the most out of it.

## 1. Use @apply Sparingly

While @apply is useful, prefer using utility classes directly for better maintainability.

## 2. Customize Your Theme

Extend the default theme in tailwind.config.js to match your brand.

## 3. Group Hover States

Use the group and group-hover utilities for complex hover effects.

## 4. Responsive Design Made Easy

Tailwind's responsive prefixes (sm:, md:, lg:) make responsive design intuitive.
    `,
    author: "Emily Watson",
    date: "2024-01-01",
    category: "Design",
    tags: ["Tailwind CSS", "CSS", "Tips"],
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
    readTime: "5 min read",
  },
  {
    slug: "web-performance-optimization",
    title: "Web Performance Optimization Strategies",
    excerpt: "Speed up your website with these proven performance optimization techniques.",
    content: `
# Web Performance Optimization Strategies

Website performance directly impacts user experience and SEO. Let's explore key optimization strategies.

## Core Web Vitals

Focus on the three Core Web Vitals: LCP, FID, and CLS for better search rankings.

## Image Optimization

Use modern formats like WebP and implement lazy loading for images below the fold.

## Code Splitting

Break your JavaScript bundle into smaller chunks that load on demand.

## Caching Strategies

Implement proper caching headers and consider using a CDN for static assets.
    `,
    author: "Marcus Rodriguez",
    date: "2023-12-28",
    category: "Development",
    tags: ["Performance", "Web Dev", "SEO"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    readTime: "9 min read",
    featured: true,
  },
  {
    slug: "accessibility-guide",
    title: "Complete Guide to Web Accessibility",
    excerpt: "Make your websites accessible to everyone with these WCAG guidelines and best practices.",
    content: `
# Complete Guide to Web Accessibility

Web accessibility ensures that websites are usable by people of all abilities. Here's how to get it right.

## Why Accessibility Matters

Accessibility isn't just about compliance—it's about creating inclusive experiences for all users.

## WCAG Guidelines

Follow the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA as a minimum standard.

## Key Areas to Focus On

- Semantic HTML
- Keyboard navigation
- Color contrast
- Screen reader support
- Focus management

## Testing Your Site

Use tools like axe, WAVE, and manual testing with screen readers.
    `,
    author: "Emily Watson",
    date: "2023-12-20",
    category: "Design",
    tags: ["Accessibility", "A11y", "Web Dev"],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop",
    readTime: "10 min read",
  },
];

export const categories = ["All", "Development", "Design"];

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);

export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);

export const getPostsByCategory = (category: string) => 
  category === "All" ? blogPosts : blogPosts.filter(post => post.category === category);
