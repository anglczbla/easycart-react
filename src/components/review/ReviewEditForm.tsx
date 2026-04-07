import { useEffect } from "react";
import type { ReviewEditProps } from "../../types/types";
import Button from "../ui/Button";
import Input from "../ui/Input";

const ReviewEditForm = ({
  review,
  submitUpdateReview,
  handleEditFormReview,
  formEditReview,
  handleEditImageReview,
  setFormEditReview,
  isPendingUpdate,
  errors,
  onCancel,
}: ReviewEditProps) => {
  useEffect(() => {
    if (review) {
      setFormEditReview({
        id: review.id,
        comment: review.comment,
        rating: review.rating.toString(),
      });
    }
  }, [review, setFormEditReview]);

  return (
    <div className="mt-4 p-6 bg-surface rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
      <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">
        Edit Your Review
      </h3>
      <form onSubmit={submitUpdateReview} className="space-y-4">
        <Input
          label="Comment"
          name="comment"
          type="text"
          onChange={handleEditFormReview}
          value={formEditReview.comment}
          errors={errors?.comment}
        />
        <Input
          label="Rating (1-5)"
          name="rating"
          type="number"
          onChange={handleEditFormReview}
          value={formEditReview.rating}
          errors={errors?.rating}
        />
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-primary/60 px-1">
            Update Image (Optional)
          </label>
          <input
            type="file"
            onChange={handleEditImageReview}
            className="w-full text-xs text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/5 file:text-primary hover:file:bg-primary/10 transition-elegant"
          />
        </div>
        <div className="pt-2 flex gap-3">
          <Button
            type="button"
            name="Cancel"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          />
          <Button
            type="submit"
            name="Update Review"
            isLoading={isPendingUpdate}
            className="flex-1"
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewEditForm;
