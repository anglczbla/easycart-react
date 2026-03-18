import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../lib/axios";

export interface Cart {
  cart_id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface AddToCart {
  product_id: string;
}

export interface deleteItemCart {
  id: string;
  product_id: string;
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
    mutationFn: (newItem: AddToCart) => {
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
    mutationFn: ({ id, product_id }: deleteItemCart) => {
      return apiClient.delete(`/cart/${id}`, {
        data: {
          product_id: product_id,
        },
      });
    },
  });
};

export const useCartActions = () => {
  const deleteItem = useDeleteItemCartMutation();
  const queryClient = useQueryClient();

  const deleteItemCart = ({ id, product_id }: deleteItemCart) => {
    deleteItem.mutate(
      { id, product_id },
      {
        onSuccess: () => {
          alert("success delete item");
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error: any) => {
          const msg = error.response?.data?.message;
          console.error(msg);
        },
      },
    );
  };

  return { deleteItemCart };
};
