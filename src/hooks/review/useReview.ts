import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";
import type { Review } from "../../types/types";

export const useGetReviewByProductId = (id: string) => {
  return useQuery<Review[]>({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await apiClient.get(`/review/${id}`);
      return res.data.data;
    },
  });
};

export const useCreateReviewMutation = () => {
  return useMutation({
    mutationFn: (newReview: FormData) => {
      return apiClient.post("/review", newReview);
    },
  });
};

export const useUpdateReviewMutation = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => {
      return apiClient.put(`/review/${id}`, formData);
    },
  });
};

export const useDeleteReviewMutation = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return apiClient.delete(`/review/${id}`);
    },
  });
};
