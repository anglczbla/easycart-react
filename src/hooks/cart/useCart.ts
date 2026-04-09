import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import apiClient from "../../lib/axios";
import { itemsInCart } from "../../store/cartSlice";
import type {
  AddToCart,
  ApiError,
  Cart,
  UpdateCart,
  deleteItemCart,
} from "../../types/types";
import { useAppSelector } from "../useAppSelector";

export const useGetCartById = () => {
  const token = useAppSelector((state) => state.auth.token);
  return useQuery<Cart[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await apiClient.get("/cart");
      return res.data.data;
    },
    enabled: !!token,
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
  return useMutation<AxiosResponse, AxiosError<ApiError>, AddToCart>({
    mutationFn: (newItem: AddToCart) => {
      return apiClient.post("/cart", newItem);
    },
  });
};

export const useUpdateCartMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, UpdateCart>({
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
  return useMutation<AxiosResponse, AxiosError<ApiError>, deleteItemCart>({
    mutationFn: ({ id, product_id }: deleteItemCart) => {
      return apiClient.delete(`/cart/${id}`, {
        data: {
          product_id: product_id,
        },
      });
    },
  });
};
