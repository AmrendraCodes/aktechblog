#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator for Vite/React + Strapi CMS
 * 
 * This script:
 * 1. Fetches all published blog posts from Strapi
 * 2. Generates a sitemap.xml with static and dynamic URLs
 * 3. Outputs to public/sitemap.xml for Vercel deployment
 */

const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.VITE_STRAPI_URL || 'https://genuine-fun-ae6ecdb902.strapiapp.com';
const SITE_URL = 'https://aktechblog.vercel.app';
const OUTPUT_PATH = path.join(__dirname, 'public', 'sitemap.xml');

// Static URLs
const staticUrls = [
  {
    loc: '/',
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    loc: '/blog',
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    loc: '/about',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: '0.7'
  }
];

/**
 * Fetch published blog posts from Strapi
 */
async function fetchBlogPosts() {
  try {
    console.log('🔍 Fetching blog posts from Strapi...');
    
    const response = await fetch(
      `${STRAPI_URL}/api/articles?fields=slug&filters[publishedAt][$notNull]=true&pagination[limit]=1000`
    );
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const posts = data.data || [];
    
    console.log(`✅ Found ${posts.length} published blog posts`);
    return posts.map(post => ({
      loc: `/blog/${post.attributes?.slug || post.slug}`,
      changefreq: 'weekly',
      priority: '0.8'
    }));
    
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error.message);
    // Return empty array if API fails to prevent sitemap generation failure
    return [];
  }
}

/**
 * Generate XML sitemap
 */
function generateSitemap(staticUrls, blogUrls) {
  const allUrls = [...staticUrls, ...blogUrls];
  const currentDate = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  allUrls.forEach(url => {
    xml += `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>`;

  return xml;
}

/**
 * Main function
 */
async function createSitemap() {
  try {
    console.log('🚀 Starting sitemap generation...');
    
    // Ensure public directory exists
    const publicDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Fetch blog posts
    const blogUrls = await fetchBlogPosts();
    
    // Generate sitemap XML
    const sitemapXml = generateSitemap(staticUrls, blogUrls);
    
    // Write to file
    fs.writeFileSync(OUTPUT_PATH, sitemapXml, 'utf8');
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📍 Location: ${OUTPUT_PATH}`);
    console.log(`📊 Total URLs: ${staticUrls.length + blogUrls.length}`);
    console.log(`📝 Static URLs: ${staticUrls.length}`);
    console.log(`📚 Blog URLs: ${blogUrls.length}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

/**
 * Run the generator
 */
if (require.main === module) {
  createSitemap();
}

module.exports = { createSitemap };
