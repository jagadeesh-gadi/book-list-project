
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/books/BookCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Book } from "@/types/book";
import { getFeaturedBooks } from "@/services/bookService";

export function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const booksPerView = 4;

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const featuredBooks = await getFeaturedBooks();
        setBooks(featuredBooks);
      } catch (error) {
        console.error("Failed to load featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + booksPerView >= books.length ? 0 : prevIndex + booksPerView));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - booksPerView < 0 ? Math.max(0, books.length - booksPerView) : prevIndex - booksPerView));
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 bg-muted animate-pulse rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return null;
  }

  const visibleBooks = books.slice(currentIndex, currentIndex + booksPerView);

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-book-primary">Featured Books</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="border-book-primary text-book-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex + booksPerView >= books.length}
              className="border-book-primary text-book-primary"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
