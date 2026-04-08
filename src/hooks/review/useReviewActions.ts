import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "./useReview";
import { AxiosError } from "axios";
import type { ApiError } from "../../types/types";

export const useReviewActions = () => {
  const queryClient = useQueryClient();
  const addReview = useCreateReviewMutation();
  const updateReview = useUpdateReviewMutation();
  const deleteReview = useDeleteReviewMutation();
  const [errors, setErrors] = useState<ApiError | null>(null);

  const handleAddReview = (
    id: string,
    formData: FormData,
    onSuccess?: () => void,
  ) => {
    addReview.mutate(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Success add review!");
          queryClient.invalidateQueries({ queryKey: ["review"] });
          onSuccess?.();
          setErrors(null);
        },
        onError: (error: AxiosError<ApiError>) => {
          setErrors(error.response?.data || { message: "An error occurred" });
        },
      },
    );
  };

  const handleUpdateReview = (
    id: string,
    formData: FormData,
    onSuccess?: () => void,
  ) => {
    updateReview.mutate(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Success update review!");
          queryClient.invalidateQueries({ queryKey: ["review"] });
          onSuccess?.();
          setErrors(null);
        },
        onError: (error: AxiosError<ApiError>) => {
          setErrors(error.response?.data || { message: "An error occurred" });
        },
      },
    );
  };

  const handleDeleteReview = (id: string, prodId: string) => {
    deleteReview.mutate(
      { id, prodId },
      {
        onSuccess: () => {
          toast.success("Success delete review!");
          queryClient.invalidateQueries({ queryKey: ["review"] });
          setErrors(null);
        },
        onError: (error: AxiosError<ApiError>) => {
          setErrors(error.response?.data || { message: "An error occurred" });
        },
      },
    );
  };

  return {
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
    isPendingAdd: addReview.isPending,
    isPendingUpdate: updateReview.isPending,
    isPendingDelete: deleteReview.isPending,
    setErrors,
    errors,
  };
};
