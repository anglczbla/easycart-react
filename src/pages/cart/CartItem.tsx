import type { Cart } from "../../types";

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
          <button
            onClick={onDelete}
            className="text-base w-20 font-semibold text-red-500  py-2 px-2 hover:opacity-80  transition duration-500 cursor-pointer"
          >
            Delete
          </button>
          <button className="cursor-pointer" onClick={onIncrementQty}>
            +
          </button>
          <button className="cursor-pointer" onClick={onDecrementQty}>
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
