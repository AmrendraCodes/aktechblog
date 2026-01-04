// Strapi API helpers – keep endpoint and logic simple, add populate=*
// Uses NEXT_PUBLIC_STRAPI_URL if provided, with fallback to VITE_STRAPI_URL

const BASE = (
  (import.meta as any)?.env?.NEXT_PUBLIC_STRAPI_URL ||
  (import.meta as any)?.env?.VITE_STRAPI_URL ||
  (typeof process !== 'undefined' ? (process as any).env?.NEXT_PUBLIC_STRAPI_URL : '') ||
  ''
) as string;

export function getStrapiBase(): string {
  return BASE || 'https://genuine-fun-ae6ecdb902.strapiapp.com';
}

export async function fetchArticles() {
  const url = `${getStrapiBase()}/api/articles?populate=*`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Strapi error ${res.status}`);
  return res.json();
}

export async function fetchArticleBySlug(slug: string) {
  const url = `${getStrapiBase()}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Strapi error ${res.status}`);
  return res.json();
}

export type UiPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
};

export function mapArticlesToUi(data: any): UiPost[] {
  const base = getStrapiBase();
  const items = Array.isArray(data?.data) ? data.data : [];
  return items.map((it: any) => {
    const a = it?.attributes || {};
    const cover = a?.cover?.data?.attributes?.url || '';
    return {
      id: it?.id,
      title: a?.title || a?.name || 'Untitled',
      excerpt: a?.description || a?.excerpt || '',
      image: cover ? `${base}${cover}` : '',
      date: a?.publishedAt || a?.createdAt || new Date().toISOString(),
      readTime: a?.readTime || '5 min',
      category: a?.category || 'General',
      slug: a?.slug || String(it?.id || ''),
    };
  });
}

export type UiPostDetail = UiPost & {
  content: string;
  author: string;
};

export function mapSingleArticleToUi(data: any): UiPostDetail | null {
  const base = getStrapiBase();
  const item = Array.isArray(data?.data) ? data.data[0] : data?.data;
  if (!item) return null;
  const a = item?.attributes || {};
  const cover = a?.cover?.data?.attributes?.url || a?.image?.data?.attributes?.url || '';
  const authorName = a?.author?.data?.attributes?.name || a?.author || 'Author';
  const category = a?.category?.data?.attributes?.name || a?.category || 'General';
  return {
    id: item?.id,
    title: a?.title || 'Untitled',
    excerpt: a?.description || a?.excerpt || '',
    image: cover ? `${base}${cover}` : '',
    date: a?.publishedAt || a?.createdAt || new Date().toISOString(),
    readTime: a?.readTime || '5 min',
    category,
    slug: a?.slug || String(item?.id || ''),
    content: a?.content || '',
    author: authorName,
  };
}
