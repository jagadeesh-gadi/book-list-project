import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { StarRating } from "@/components/books/StarRating";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewFormProps {
  bookId: string;
  onSubmit: (review: {
    bookId: string;
    rating: number;
    title: string;
    content: string;
  }) => Promise<void>;
}

export function ReviewForm({ bookId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    if (title.trim() === "") {
      setError("Please enter a review title");
      return;
    }
    
    if (content.trim() === "") {
      setError("Please enter your review");
      return;
    }
  
    setIsSubmitting(true);
    setError("");
    
    try {
      // Send the review data to the backend API
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId,
          rating,
          title,
          content,
        }),
      });
  
      // Check if the response is ok
      if (!response.ok) {
        // Get detailed error from response
        const data = await response.json();
        throw new Error(data.message || `Failed to submit review. Status code: ${response.status}`);
      }
  
      // Reset form after successful submission
      setRating(0);
      setTitle("");
      setContent("");
      setError(""); // Reset any error messages
  
      // Optionally, call onSubmit if you need to notify the parent
      await onSubmit({ bookId, rating, title, content });
    } catch (err) {
      setError(err.message || "Failed to submit review. Please try again.");
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Reset error when the user starts typing in the form fields
  const handleFieldChange = () => {
    if (error) {
      setError("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Write a Review</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Your Rating</label>
            <StarRating
              rating={rating}
              size="lg"
              interactive
              onChange={setRating}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="review-title" className="block text-sm font-medium">
              Review Title
            </label>
            <Input
              id="review-title"
              placeholder="Summarize your thoughts"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleFieldChange(); // Reset error when user types
              }}
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="review-content" className="block text-sm font-medium">
              Your Review
            </label>
            <Textarea
              id="review-content"
              placeholder="What did you like or dislike about this book?"
              rows={5}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                handleFieldChange(); // Reset error when user types
              }}
              maxLength={2000}
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-book-primary hover:bg-book-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
