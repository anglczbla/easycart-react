import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteItemCartMutation,
  type Cart,
  type deleteItemCart,
} from "../../hooks/cart/useCart";

interface CartItemProps {
  cart: Cart;
}

const CartItem = ({ cart }: CartItemProps) => {
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

  return (
    <div>
      <ul>
        <li>{cart.name}</li>
        <li>{cart.price}</li>
        <li>{cart.quantity}</li>{" "}
        <button
          onClick={() =>
            deleteItemCart({ id: cart.cart_id, product_id: cart.product_id })
          }
        >
          Delete
        </button>
      </ul>
    </div>
  );
};

export default CartItem;
