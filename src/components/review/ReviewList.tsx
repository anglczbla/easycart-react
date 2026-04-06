import type { Review } from "../../types/types";
import ReviewItem from "./ReviewItem";

export interface ReviewListProps {
  review: Review[];
  deleteReview: (id: string, prodId: string) => void;
  showEdit: boolean;
  toggleEdit: () => void;
}
const ReviewList = ({
  review,
  deleteReview,
  showEdit,
  toggleEdit,
}: ReviewListProps) => {
  return (
    <div>
      {review.map((r) => (
        <ReviewItem
          key={r.id}
          review={r}
          deleteReview={deleteReview}
          showEdit={showEdit}
          toggleEdit={toggleEdit}
        />
      ))}
    </div>
  );
};

export default ReviewList;
