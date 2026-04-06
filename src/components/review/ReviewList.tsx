import type { ReviewListProps } from "../../types/types";
import ReviewItem from "./ReviewItem";

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
