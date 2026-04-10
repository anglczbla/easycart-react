import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { ApiError, deleteItemCart, UpdateCart } from "../../types/types";
import {
  useDeleteItemCartMutation,
  useGetCartById,
  useUpdateCartMutation,
} from "./useCart";

export const useCartActions = () => {
  const deleteItem = useDeleteItemCartMutation();
  const updateCart = useUpdateCartMutation();
  const queryClient = useQueryClient();
  const cart = useGetCartById();
  const navigate = useNavigate();
  const data = cart.data || [];

  const totalPrice = data.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    navigate("/order");
  };

  const deleteItemCart = ({ id, product_id }: deleteItemCart) => {
    deleteItem.mutate(
      { id, product_id },
      {
        onSuccess: () => {
          toast.success("success delete item");
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error: AxiosError<ApiError>) => {
          const msg = error.response?.data?.message || "An error occurred";
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
        onError: (error: AxiosError<ApiError>) => {
          const msg = error.response?.data?.message || "An error occurred";
          console.error(msg);
        },
      },
    );
  };

  return {
    deleteItemCart,
    updateQtyItemCart,
    totalPrice,
    handleCheckout,
    data,
    errorMessage: updateCart.error?.response?.data?.message,
  };
};
