import type { ReviewListProps } from "../../types/types";
import ReviewItem from "./ReviewItem";

const ReviewList = ({
  review,
  deleteReview,
  showEdit,
  toggleEdit,
  submitUpdateReview,
  handleEditFormReview,
  formEditReview,
  handleEditImageReview,
  setFormEditReview,
  isPendingUpdate,
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
          submitUpdateReview={submitUpdateReview}
          handleEditFormReview={handleEditFormReview}
          formEditReview={formEditReview}
          handleEditImageReview={handleEditImageReview}
          setFormEditReview={setFormEditReview}
          isPendingUpdate={isPendingUpdate}
        />
      ))}
    </div>
  );
};

export default ReviewList;
