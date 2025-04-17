import { useState, useEffect } from "react";
import axios from "axios";  // Make sure axios is installed (npm install axios)
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StarRating } from "@/components/books/StarRating";
import { Review } from "@/types/review";
import { formatDistanceToNow } from "date-fns";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="border-book-accent/20">
      <CardHeader className="p-4 pb-0 flex flex-row items-start gap-4">
        <Avatar>
          <AvatarImage src={review.user.avatar} alt={review.user.name} />
          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center justify-between w-full">
            <div className="font-medium">{review.user.name}</div>
            <time className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
            </time>
          </div>
          <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <h4 className="font-medium text-base mb-2">{review.title}</h4>
        <p className="text-sm text-muted-foreground">{review.content}</p>
      </CardContent>
    </Card>
  );
}

// New Reviews Fetching Component

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch reviews from the backend
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reviews");
        setReviews(response.data);  // Assuming the response is an array of reviews
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch reviews.");
      }
    };

    fetchReviews();
  }, []);

  if (error) {
    return <div>{error}</div>;  // Display error if fetching fails
  }

  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default Reviews;
