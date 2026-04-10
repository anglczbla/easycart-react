import { Star } from "lucide-react";
import React from "react";
import type { StarRatingInputProps } from "../../types/types";

const StarRatingInput = ({
  label,
  name,
  value,
  onChange,
  errors,
}: StarRatingInputProps) => {
  const currentRating = parseInt(value, 10) || 0;

  const handleStarClick = (star: number) => {
    const event = {
      target: {
        name,
        value: star.toString(),
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  return (
    <div className="space-y-1.5 w-full text-left">
      <label className="text-sm font-semibold text-primary/80 px-1">
        {label}
      </label>
      <div className="flex items-center gap-1 px-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              size={24}
              className={`transition-colors ${
                star <= currentRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      {errors && (
        <div className="flex flex-col gap-1 mt-1.5 px-1">
          {errors.map((error, idx) => (
            <span key={idx} className="text-xs font-medium text-error">
              {error}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StarRatingInput;
