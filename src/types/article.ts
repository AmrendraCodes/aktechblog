export interface Article {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  publishedAt: string;
  hasFeaturedImage: boolean;
  cover?: {
    url?: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
      thumbnail?: { url: string };
    };
  };
}