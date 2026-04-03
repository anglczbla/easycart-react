import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "../cart/useCart";
import { usegetAllProductsById } from "./useProduct";

export const useProductDetail = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = usegetAllProductsById(id);
  const addToCart = useAddToCartMutation();
  const stock = Number(data?.stock);

  const handleCheckout = () => {
    navigate("/order");
  };

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
    handleCheckout,
    stock,
  };
};
