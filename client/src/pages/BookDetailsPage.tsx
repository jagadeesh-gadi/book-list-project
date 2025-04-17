import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/books/StarRating";
import { ReviewCard } from "@/components/books/ReviewCard";
import { ReviewForm } from "@/components/books/ReviewForm";
import { getBookById, getReviewsForBook, submitReview } from "@/services/bookService";
import { Book } from "@/types/book";
import { Review } from "@/types/review";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Calendar, BookOpen } from "lucide-react";
import { format } from "date-fns";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      setError("");

      try {
        const bookData = await getBookById(id);
        if (bookData) {
          setBook(bookData);
        } else {
          setError("Book not found");
        }
      } catch (err) {
        console.error("Failed to fetch book details:", err);
        setError("Failed to load book details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;

      setReviewsLoading(true);

      try {
        const bookReviews = await getReviewsForBook(id);
        setReviews(bookReviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (reviewData: {
    bookId: string;
    rating: number;
    title: string;
    content: string;
  }) => {
    try {
      const newReview = await submitReview(reviewData);
      setReviews((prevReviews) => [newReview, ...prevReviews]);
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to submit review:", error);
      return Promise.reject(error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-muted rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="aspect-[2/3] bg-muted rounded-lg"></div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="h-8 w-3/4 bg-muted rounded"></div>
              <div className="h-4 w-1/3 bg-muted rounded"></div>
              <div className="h-4 w-1/4 bg-muted rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-book-primary">Error</h2>
        <p className="mb-4 text-muted-foreground">{error || "Book not found"}</p>
        <Link to="/books">
          <Button>Return to Books</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/books" className="inline-flex items-center text-book-primary hover:underline mb-6">
        <ChevronLeft size={16} />
        <span>Back to Books</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full bg-book-primary hover:bg-book-secondary">
                Add to Reading List
              </Button>
              <Button variant="outline" className="w-full">
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2 font-serif text-book-primary">{book.title}</h1>
          <p className="text-xl mb-4">by {book.author}</p>

          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={book.averageRating} size="lg" />
            <span className="text-muted-foreground">
              ({book.averageRating.toFixed(1)}) · {book.reviewCount} reviews
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {book.genres.map((genre, index) => (
              <Badge key={index} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Published: {format(new Date(book.publicationDate), "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {book.pageCount} pages
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Publisher: {book.publisher}
              </span>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-xl font-semibold mb-4 font-serif">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">{book.description}</p>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-xl font-semibold mb-6 font-serif">Reviews</h2>

            {/* Review Form */}
            <div className="mb-8">
              <ReviewForm
                bookId={book.id}
                onSubmit={handleReviewSubmit}
              />
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviewsLoading ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="animate-pulse border rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted h-10 w-10"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-muted rounded w-1/4"></div>
                          <div className="h-3 bg-muted rounded w-1/3"></div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No reviews yet. Be the first to review this book!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
