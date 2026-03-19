import { type Cart } from "../../hooks/cart/useCart";

interface CartItemProps {
  cart: Cart;
  totalPrice: number;
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
    <div className="w-full p-3">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10 p-5">
        <ul>
          <li>{cart.name}</li>
          <li>{cart.price}</li>
          <li>{cart.quantity}</li>
        </ul>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onIncrementQty}>+</button>
        <button onClick={onDecrementQty}>-</button>
      </div>
    </div>
  );
};

export default CartItem;
