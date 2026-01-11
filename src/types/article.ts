export interface Article {
  id: number;
  Title: string;
  slug: string;
  content: any[];
  cover?: {
    data?: {
      attributes?: {
        url?: string;
        formats?: {
          small?: { url: string };
          medium?: { url: string };
          large?: { url: string };
          thumbnail?: { url: string };
        };
      };
    };
  };
}
