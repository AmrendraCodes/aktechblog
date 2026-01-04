// Strapi API helpers – keep endpoint and logic simple, add populate=*
// Uses NEXT_PUBLIC_STRAPI_URL if provided, with fallback to VITE_STRAPI_URL

const BASE = (
  (import.meta as any)?.env?.VITE_STRAPI_URL ||
  (typeof process !== 'undefined' ? (process as any).env?.VITE_STRAPI_URL : '') ||
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
  const toAbsolute = (url: string | undefined): string => {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    return `${base}${url}`;
  };
  // Support both nested and flat structures
  const items = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
  return items.map((it: any) => {
    // Support both nested and flat attribute structures
    const a = it?.attributes || it;
    const cover =
      a?.cover?.data?.attributes?.url ||
      a?.image?.data?.attributes?.url ||
      a?.cover?.url ||
      a?.image?.url ||
      a?.cover ||
      a?.image ||
      '';
    const categoryName =
      a?.category?.data?.attributes?.name ||
      a?.category ||
      (Array.isArray(a?.categories?.data) && a.categories.data[0]?.attributes?.name) ||
      (Array.isArray(a?.categories) && a.categories[0]?.name) ||
      'General';
    return {
      id: it?.id || a?.id,
      title: a?.title || a?.name || 'Untitled',
      excerpt: a?.description || a?.excerpt || a?.content?.slice(0, 150) || '',
      image: toAbsolute(cover),
      date: a?.publishedAt || a?.createdAt || new Date().toISOString(),
      readTime: a?.readTime || '5 min',
      category: categoryName,
      slug: a?.slug || String(it?.id || a?.id || ''),
    };
  });
}

export type UiPostDetail = UiPost & {
  content: string;
  author: string;
};

export function mapSingleArticleToUi(data: any): UiPostDetail | null {
  const base = getStrapiBase();
  const item = Array.isArray(data?.data) ? data.data[0] : data?.data || data;
  if (!item) return null;
  const a = item?.attributes || item;
  const cover =
    a?.cover?.data?.attributes?.url ||
    a?.image?.data?.attributes?.url ||
    a?.cover?.url ||
    a?.image?.url ||
    a?.cover ||
    a?.image ||
    '';
  const authorName =
    a?.author?.data?.attributes?.name ||
    a?.author?.name ||
    a?.author ||
    'Author';
  const category =
    a?.category?.data?.attributes?.name ||
    a?.category ||
    (Array.isArray(a?.categories?.data) && a.categories.data[0]?.attributes?.name) ||
    (Array.isArray(a?.categories) && a.categories[0]?.name) ||
    'General';
  return {
    id: item?.id || a?.id,
    title: a?.title || 'Untitled',
    excerpt: a?.description || a?.excerpt || '',
    image: cover ? (/^https?:\/\//i.test(cover) ? cover : `${base}${cover}`) : '',
    date: a?.publishedAt || a?.createdAt || new Date().toISOString(),
    readTime: a?.readTime || '5 min',
    category,
    slug: a?.slug || String(item?.id || a?.id || ''),
    content: a?.content || '',
    author: authorName,
  };
}
