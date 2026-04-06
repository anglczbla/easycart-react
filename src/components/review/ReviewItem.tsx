import type { Review } from "../../types/types";

export interface ReviewItemProps {
  review: Review;
  updateReview: (e: React.FormEvent) => void;
  deleteReview: (id: string) => void;
}
const ReviewItem = ({
  review,
  updateReview,
  deleteReview,
}: ReviewItemProps) => {
  return <div>ReviewItem</div>;
};

export default ReviewItem;
