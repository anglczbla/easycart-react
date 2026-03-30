import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import apiClient from "../../lib/axios";
import { itemsInCart } from "../../store/cartSlice";
import type {
  AddToCart,
  Cart,
  UpdateCart,
  deleteItemCart,
} from "../../types/types";

export const useGetCartById = () => {
  return useQuery<Cart[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await apiClient.get("/cart");
      return res.data.data;
    },
  });
};

export const useGetCart = () => {
  const dispatch = useDispatch();
  const { data } = useGetCartById();
  useEffect(() => {
    if (data) {
      dispatch(itemsInCart(data));
    }
  }, [data, dispatch]);
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
    mutationFn: ({ id, quantity, product_id }: UpdateCart) => {
      const data = {
        quantity,
        product_id,
      };
      return apiClient.put(`/cart/${id}`, data);
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
  const updateCart = useUpdateCartMutation();
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

  const updateQtyItemCart = ({ id, quantity, product_id }: UpdateCart) => {
    updateCart.mutate(
      {
        id,
        quantity,
        product_id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error: any) => {
          const msg = error.response?.data?.message;
          console.error(msg);
        },
      },
    );
  };

  return {
    deleteItemCart,
    updateQtyItemCart,

    errorMessage: (updateCart.error as any)?.response?.data?.message,
  };
};
