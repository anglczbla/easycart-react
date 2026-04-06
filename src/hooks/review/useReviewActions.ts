import { useQueryClient } from "@tanstack/react-query";
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
          console.error(error);
        },
      },
    );
  };

  const handleUpdateReview = (id: string, formData: FormData) => {
    updateReview.mutate(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Success update review!");
          queryClient.invalidateQueries({ queryKey: ["review"] });
        },
        onError: (error: any) => {
          console.error(error);
        },
      },
    );
  };

  const handleDeleteReview = (id: string) => {
    deleteReview.mutate(id, {
      onSuccess: () => {
        toast.success("Success delete product!");
        queryClient.invalidateQueries({ queryKey: ["review"] });
      },
      onError: (error: any) => {
        console.error(error);
      },
    });
  };

  return {
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
    isPendingAdd: addReview.isPending,
    isPendingUpdate: updateReview.isPending,
    isPendingDelete: deleteReview.isPending,
  };
};
