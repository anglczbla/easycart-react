import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface ProductForm {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}

export interface updateProduct extends Product {
  id: string;
}

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

export const useSearchProduct = (query: string) => {
  return useQuery<Product[]>({
    queryKey: ["search", query],
    queryFn: async () => {
      const res = await apiClient.get(`/products/search?product=${query}`);
      console.log("tes", res.data.product);
      return res.data.product;
    },
    enabled: !!query,
    placeholderData: [],
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
    mutationFn: (data: updateProduct) => {
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
