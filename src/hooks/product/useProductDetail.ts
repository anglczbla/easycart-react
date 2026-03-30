import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "../cart/useCart";
import { usegetAllProductsById } from "./useProduct";

export const useProductDetail = (id: string) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = usegetAllProductsById(id);
  const addToCart = useAddToCartMutation();

  const addItem = () => {
    if (!data) return;

    addToCart.mutate(
      { product_id: data.id, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("success add to cart");
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
      },
    );
  };

  return {
    data,
    isLoading,
    addItem,
    isPending: addToCart.isPending,
  };
};
