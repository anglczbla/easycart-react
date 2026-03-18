import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";

export interface Cart {
  cart_id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useGetCartById = () => {
  return useQuery<Cart[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await apiClient.get("/cart");
      return res.data.data;
    },
  });
};

export const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: (newItem: Cart) => {
      return apiClient.post("/cart", newItem);
    },
  });
};

export const useUpdateCartMutation = () => {
  return useMutation({
    mutationFn: (newItem: Cart) => {
      const data = {
        quantity: newItem.quantity,
        product_id: newItem.product_id,
      };
      return apiClient.put(`/cart/${newItem.cart_id}`, data);
    },
  });
};

export const useDeleteItemCartMutation = () => {
  return useMutation({
    mutationFn: (item: Cart) => {
      const product_id = item.product_id;
      return apiClient.delete(`/cart/${item.cart_id}`, {
        data: {
          product_id: product_id,
        },
      });
    },
  });
};
