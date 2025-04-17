
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  averageRating: number;
  reviewCount: number;
  genres: string[];
  publicationDate: string;
  publisher: string;
  pageCount: number;
  featured: boolean;
}
