import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";

interface Products {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface UpdateProduct extends Products {
  id: string;
}

export const usegetAllProducts = () => {
  return useQuery<Products[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      return res.data;
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
    mutationFn: ({ id, ...newProduct }: UpdateProduct) => {
      return apiClient.put(`/products/${id}`, newProduct);
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
