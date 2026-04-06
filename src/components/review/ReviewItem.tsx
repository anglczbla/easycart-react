import { Edit2, Star, Trash2 } from "lucide-react";
import type { Review } from "../../types/types";
import Button from "../ui/Button";
import ReviewEditForm from "./ReviewEditForm";

export interface ReviewItemProps {
  review: Review;
  deleteReview: (id: string, prodId: string) => void;
  showEdit: boolean;
  toggleEdit: () => void;
}

const ReviewItem = ({
  review,
  deleteReview,
  showEdit,
  toggleEdit,
}: ReviewItemProps) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 card-shadow mb-4 last:mb-0 transition-elegant hover:border-primary/20">
      <div className="flex flex-col md:flex-row gap-6">
        {review.image && (
          <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
            <img
              src={review.image}
              alt="Review"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Number(review.rating)
                      ? "fill-warning text-warning"
                      : "fill-gray-100 text-gray-200"
                  }
                />
              ))}
              <span className="ml-2 text-sm font-bold text-primary/80">
                {review.rating}/5
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-2! rounded-xl!"
                onClick={toggleEdit}
                name={<Edit2 size={16} className="text-primary/60" />}
              />
              <Button
                variant="ghost"
                size="sm"
                className="p-2! rounded-xl! hover:bg-error/5"
                onClick={() => deleteReview(review.id, review.product_id)}
                name={<Trash2 size={16} className="text-error/60" />}
              />
            </div>
          </div>
          <p className="text-primary/70 leading-relaxed font-medium">
            {review.comment}
          </p>
        </div>
      </div>

      {showEdit && (
        <div className="mt-4 border-t border-gray-50 pt-4">
          <ReviewEditForm review={review} />
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
