import { type Cart } from "../../hooks/cart/useCart";

interface CartItemProps {
  cart: Cart;
  onDelete: () => void;
}

const CartItem = ({ cart, onDelete }: CartItemProps) => {
  return (
    <div>
      <ul>
        <li>{cart.name}</li>
        <li>{cart.price}</li>
        <li>{cart.quantity}</li>{" "}
        <button onClick={onDelete}>Delete</button>
      </ul>
    </div>
  );
};

export default CartItem;
