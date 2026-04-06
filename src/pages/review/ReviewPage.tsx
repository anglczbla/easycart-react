import { MessageSquarePlus, X } from "lucide-react";
import { useState } from "react";
import ReviewList from "../../components/review/ReviewList";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useReviewForm } from "../../hooks/review/useReviewForm";
import { useAppSelector } from "../../hooks/useAppSelector";

const ReviewPage = ({ productId }: { productId: string }) => {
  const admin = useAppSelector((state) => state.auth.admin);
  const [showForm, setShowForm] = useState(false);
  const {
    submitReview,
    handleDeleteReview,
    handleImageReview,
    handleFormReview,
    formReview,
    review,
    isPendingAdd,
    showEdit,
    toggleEdit,
  } = useReviewForm(productId);

  const toggleForm = () => setShowForm(!showForm);

  const handleSubmit = (e: React.FormEvent) => {
    submitReview(e);
    setShowForm(false);
  };

  return (
    <div>
      {!admin && (
        <div className="max-w-4xl mx-auto py-10 px-4">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex gap-5">
              <h2 className="text-2xl font-bold text-primary">
                Customer Reviews
              </h2>
              <Button
                variant={showForm ? "secondary" : "primary"}
                onClick={toggleForm}
                className="rounded-2xl shadow-sm"
                name={
                  <div className="flex items-center gap-2">
                    {showForm ? (
                      <X size={18} />
                    ) : (
                      <MessageSquarePlus size={18} />
                    )}
                    <span>{showForm ? "Cancel" : "Write a Review"}</span>
                  </div>
                }
              />
            </div>
          </div>

          {showForm && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
              <h3 className="text-xl font-bold text-primary mb-6">
                Review This Product
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Comment"
                  name="comment"
                  type="text"
                  placeholder="What do you think about this product?"
                  onChange={handleFormReview}
                  value={formReview.comment}
                />
                <Input
                  label="Rating (1-5)"
                  name="rating"
                  type="number"
                  placeholder="5"
                  onChange={handleFormReview}
                  value={formReview.rating}
                />
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary/80 px-1">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={handleImageReview}
                    className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/5 file:text-primary hover:file:bg-primary/10 transition-elegant"
                  />
                </div>
                <Button
                  type="submit"
                  name={"Submit Review"}
                  isLoading={isPendingAdd}
                  className="w-full"
                />
              </form>
            </div>
          )}

          <div className="space-y-6">
            {review && review.length > 0 ? (
              <ReviewList
                review={review}
                deleteReview={handleDeleteReview}
                showEdit={showEdit}
                toggleEdit={toggleEdit}
              />
            ) : (
              <div className="text-center py-12 bg-surface rounded-3xl border border-dashed border-gray-200">
                <p className="text-muted font-medium">
                  No reviews yet. Be the first to review!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
