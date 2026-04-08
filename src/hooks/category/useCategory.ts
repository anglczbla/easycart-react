import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import apiClient from "../../lib/axios";
import type { ApiError, Category } from "../../types/types";

export const usegetAllCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await apiClient.get("/category");
      return res.data.data;
    },
  });
};

export const useAddCategoryMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, Category>({
    mutationFn: (newCategory: Category) => {
      return apiClient.post("/category", newCategory);
    },
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, Category>({
    mutationFn: (category: Category) => {
      return apiClient.put(`/category/${category.id}`, category);
    },
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, string>({
    mutationFn: (id: string) => {
      return apiClient.delete(`/category/${id}`);
    },
  });
};
