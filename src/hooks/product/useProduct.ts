import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";
import type { Product } from "../../types";

export const usegetAllProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      return res.data.data;
    },
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
  return useMutation({
    mutationFn: (newProduct: Omit<Product, "id">) => {
      return apiClient.post("/products", newProduct);
    },
  });
};

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: (data: Product) => {
      return apiClient.put(`/products/${data.id}`, data);
    },
  });
};

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return apiClient.delete(`/products/${id}`);
    },
  });
};
