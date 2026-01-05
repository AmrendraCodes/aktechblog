// Vercel Serverless API Proxy for Strapi Articles
// This handles the SSL/TLS issue by making server-to-server requests

export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get query parameters from frontend request
    const { page = '1', pageSize = '6', fields, sort, filters } = req.query;
    
    // Build Strapi API URL with parameters
    const strapiUrl = new URL('https://genuine-fun-a6ecdb902.strapiapp.com/api/articles');
    
    // Add pagination
    strapiUrl.searchParams.set('pagination[page]', page);
    strapiUrl.searchParams.set('pagination[pageSize]', pageSize);
    
    // Add default fields if not specified
    if (!fields) {
      strapiUrl.searchParams.set('fields[0]', 'title');
      strapiUrl.searchParams.set('fields[1]', 'slug');
      strapiUrl.searchParams.set('fields[2]', 'description');
      strapiUrl.searchParams.set('fields[3]', 'publishedAt');
    } else {
      // Handle fields array from query params
      if (Array.isArray(fields)) {
        fields.forEach((field, index) => {
          strapiUrl.searchParams.set(`fields[${index}]`, field);
        });
      } else {
        strapiUrl.searchParams.set('fields[0]', fields);
      }
    }
    
    // Add default sort if not specified
    if (!sort) {
      strapiUrl.searchParams.set('sort[0]', 'publishedAt:desc');
    } else {
      strapiUrl.searchParams.set('sort[0]', sort);
    }
    
    // Add publication state
    strapiUrl.searchParams.set('publicationState', 'live');
    
    // Add any additional filters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        strapiUrl.searchParams.set(key, value);
      });
    }
    
    console.log('Proxy fetching from:', strapiUrl.toString());
    
    // Make server-to-server request to Strapi Cloud
    const response = await fetch(strapiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Proxy/1.0'
      },
      // No timeout for server-to-server requests
    });
    
    if (!response.ok) {
      console.error('Strapi API error:', response.status, response.statusText);
      throw new Error(`Strapi API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Strapi response success:', data.data?.length || 0, 'articles');
    
    // Return the data as-is to frontend
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch articles from Strapi',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
