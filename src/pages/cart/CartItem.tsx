import { type Cart } from "../../hooks/cart/useCart";

interface CartItemProps {
  cart: Cart;
  onDelete: () => void;
  onIncrementQty: () => void;
  onDecrementQty: () => void;
}

const CartItem = ({
  cart,
  onDelete,
  onIncrementQty,
  onDecrementQty,
}: CartItemProps) => {
  return (
    <div>
      <ul>
        <li>{cart.name}</li>
        <li>{cart.price}</li>
        <li>{cart.quantity}</li>
      </ul>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onIncrementQty}>+</button>
      <button onClick={onDecrementQty}>-</button>
    </div>
  );
};

export default CartItem;
