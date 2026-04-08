import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import apiClient from "../../lib/axios";
import type { ApiError, Review } from "../../types/types";

export const useGetReviewByProductId = (id: string) => {
  return useQuery<Review[]>({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await apiClient.get(`/review/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

export const useCreateReviewMutation = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<ApiError>,
    { id: string; formData: FormData }
  >({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => {
      return apiClient.post(`/review/${id}`, formData);
    },
  });
};

export const useUpdateReviewMutation = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<ApiError>,
    { id: string; formData: FormData }
  >({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => {
      return apiClient.put(`/review/${id}`, formData);
    },
  });
};

export const useDeleteReviewMutation = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<ApiError>,
    { id: string; prodId: string }
  >({
    mutationFn: ({ id, prodId }: { id: string; prodId: string }) => {
      return apiClient.delete(`/review/${id}/${prodId}`);
    },
  });
};
