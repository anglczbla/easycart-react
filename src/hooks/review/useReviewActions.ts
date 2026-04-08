import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "./useReview";

export const useReviewActions = () => {
  const queryClient = useQueryClient();
  const addReview = useCreateReviewMutation();
  const updateReview = useUpdateReviewMutation();
  const deleteReview = useDeleteReviewMutation();
  const [errors, setErrors] = useState<any>({});

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
        },
        onError: (error: any) => {
          setErrors(error.response.data);
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
        },
        onError: (error: any) => {
          setErrors(error.response.data);
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
        },
        onError: (error: any) => {
          setErrors(error.response.data);
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
    // errorsUpdateReview: (updateReview.error as any)?.response?.data,
    // errorAddReview: (addReview.error as any)?.response?.data,
    setErrors,
    errors,
  };
};
