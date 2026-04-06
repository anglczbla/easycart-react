import type { Review } from "../../types/types";
import ReviewItem from "./ReviewItem";

export interface ReviewListProps {
  review: Review[];
  updateReview: (e: React.FormEvent) => void;
  deleteReview: (id: string) => void;
}
const ReviewList = ({
  review,
  updateReview,
  deleteReview,
}: ReviewListProps) => {
  return (
    <div>
      {review.map((r) => (
        <ReviewItem
          key={r.id}
          review={r}
          updateReview={updateReview}
          deleteReview={deleteReview}
        />
      ))}
    </div>
  );
};

export default ReviewList;
