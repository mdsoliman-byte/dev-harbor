
interface StarRatingProps {
  rating: number;
}

// Function to generate star rating display
const StarRating = ({ rating }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="inline-block">
          {i < fullStars ? (
            "★"
          ) : i === fullStars && hasHalfStar ? (
            "★" // Use a full star for simplicity, could be replaced with a half-star
          ) : (
            "☆"
          )}
        </span>
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
