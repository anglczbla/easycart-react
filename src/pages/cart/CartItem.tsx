import type { Cart } from "../../types/types";
import Button from "../ui/Button";

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
      <div className="flex gap-10 bg-white rounded-xl shadow-lg overflow-hidden mb-10 p-5">
        <div className="p-2">
          <ul>
            <li>Name: {cart.name}</li>
            <li>Price: {cart.price}</li>
            <li>Qty: {cart.quantity}</li>
          </ul>
        </div>
        <div className="flex gap-5">
          <Button
            onClick={onDelete}
            className="text-red-500 py-2 px-2 w-20"
            name="Delete"
          />
          <Button
            className="w-10 px-2 py-2"
            onClick={onIncrementQty}
            name="+"
          />
          <Button
            className="w-10 px-2 py-2"
            onClick={onDecrementQty}
            name="-"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
