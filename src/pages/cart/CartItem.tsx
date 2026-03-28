import type { Cart } from "../../types/types";

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
        <div>
          <img src={cart.image} alt={cart.image} className="h-20 rounded-lg" />
        </div>
        <div className="p-2">
          <ul>
            <li>Name: {cart.name}</li>
            <li>Price: {cart.price}</li>
            <li>Qty: {cart.quantity}</li>
          </ul>
        </div>
        <div className="flex gap-5">
          <button
            onClick={onDelete}
            className="font-bold text-red-500 hover:opacity-80 cursor-pointer"
          >
            Delete
          </button>

          <button onClick={onIncrementQty} className="font-bold cursor-pointer">
            +
          </button>
          <button onClick={onDecrementQty} className="font-bold cursor-pointer">
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
