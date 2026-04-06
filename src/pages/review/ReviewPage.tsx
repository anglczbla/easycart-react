import ReviewList from "../../components/review/ReviewList";
import Input from "../../components/ui/Input";
import { useReviewForm } from "../../hooks/review/useReviewForm";

const ReviewPage = () => {
  const {
    submitReview,
    submitUpdateReview,
    handleDeleteReview,
    handleImageReview,
    handleFormReview,
    formReview,
    review,
    handleEditFormReview,
    handleEditImageReview,
  } = useReviewForm();

  return (
    <div>
      <div>
        <h1>Review This Product</h1>
        <form onSubmit={submitReview}>
          <Input
            name="comment"
            type="text"
            onChange={handleFormReview}
            value={formReview.comment}
          />
          <Input
            name="rating"
            type="number"
            onChange={handleFormReview}
            value={formReview.rating}
          />
          <input type="file" onChange={handleImageReview} />
        </form>
        <ReviewList
          review={review || []}
          updateReview={submitUpdateReview}
          deleteReview={handleDeleteReview}
        />
      </div>
    </div>
  );
};

export default ReviewPage;
