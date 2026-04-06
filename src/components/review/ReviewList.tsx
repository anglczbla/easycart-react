import type { Review } from "../../types/types";
import ReviewItem from "./ReviewItem";

export interface ReviewListProps {
  review: Review[];
  deleteReview: (id: string) => void;
}
const ReviewList = ({ review, deleteReview }: ReviewListProps) => {
  return (
    <div>
      {review.map((r) => (
        <ReviewItem key={r.id} review={r} deleteReview={deleteReview} />
      ))}
    </div>
  );
};

export default ReviewList;
