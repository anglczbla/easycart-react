import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";
import type { Category } from "../../types";

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
  return useMutation({
    mutationFn: (newCategory: Category) => {
      return apiClient.post("/category", newCategory);
    },
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationFn: (category: Category) => {
      return apiClient.put(`/category/${category.id}`, category);
    },
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return apiClient.delete(`/category/${id}`);
    },
  });
};
