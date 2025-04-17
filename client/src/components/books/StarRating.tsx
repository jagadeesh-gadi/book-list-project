
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  max = 5,
  size = "sm",
  interactive = false,
  onChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(max)].map((_, index) => {
        const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            disabled={!interactive}
            className={`${interactive ? "cursor-pointer" : "cursor-default"} text-book-primary`}
            aria-label={`${index + 1} stars`}
          >
            <span className="relative block">
              {/* Empty star (background) */}
              <Star className={`${sizeClasses[size]} text-book-accent`} />
              
              {/* Filled star (foreground) with clip-path for partial filling */}
              <Star
                className={`${sizeClasses[size]} absolute top-0 left-0 text-book-primary overflow-hidden`}
                style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
