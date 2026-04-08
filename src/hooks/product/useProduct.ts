import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import apiClient from "../../lib/axios";
import type { ApiError, Product } from "../../types/types";

export const usegetAllProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      return res.data.data;
    },
    staleTime: 0,
  });
};

export const usegetAllProductsById = (id: string) => {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${id}`);
      return res.data.data;
    },
  });
};

export const useSearchProduct = (query: string, category: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", query, category],
    queryFn: async () => {
      const res = await apiClient.get(
        `/products/search?product=${query}&category=${category}`,
      );
      return res.data.product;
    },
    enabled: !!query || !!category,
    staleTime: 0,
  });
};

export const useAddProductMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, FormData>({
    mutationFn: (newProduct: FormData) => {
      return apiClient.post("/products", newProduct);
    },
  });
};

export const useUpdateProductMutation = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<ApiError>,
    { id: string; formData: FormData }
  >({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => {
      return apiClient.put(`/products/${id}`, formData);
    },
  });
};

export const useDeleteProductMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, string>({
    mutationFn: (id: string) => {
      return apiClient.delete(`/products/${id}`);
    },
  });
};
