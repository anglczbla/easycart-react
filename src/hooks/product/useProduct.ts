import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";

export interface Products {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export const usegetAllProducts = () => {
  return useQuery<Products[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      return res.data.data;
    },
  });
};

export const usegetAllProductsById = (id: string) => {
  return useQuery<Products[]>({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${id}`);
      return res.data.data;
    },
  });
};

export const useAddProductMutation = () => {
  return useMutation({
    mutationFn: (newProduct: Products) => {
      return apiClient.post("/products", newProduct);
    },
  });
};

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: (product: Products) => {
      return apiClient.put(`/products/${product.id}`, product);
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
