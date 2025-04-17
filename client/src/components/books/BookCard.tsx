
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/books/StarRating";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/books/${book.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {book.featured && (
            <Badge className="absolute top-2 right-2 bg-book-primary">Featured</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif text-lg font-semibold line-clamp-2 mb-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <div className="flex items-center gap-2">
            <StarRating rating={book.averageRating} />
            <span className="text-sm text-muted-foreground">({book.reviewCount})</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
