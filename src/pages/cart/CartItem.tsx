import type { Cart } from "../../types/types";
import PriceTag from "../ui/PriceTag";

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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 flex flex-col sm:flex-row gap-6 items-center transition-all hover:shadow-md">
      <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={cart.image}
          alt={cart.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="flex-grow text-center sm:text-left">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{cart.name}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-center sm:justify-start">
          <PriceTag price={cart.price} className="text-primary font-semibold" />
          <span className="hidden sm:inline text-gray-300">|</span>
          <p className="text-sm text-gray-500">
            Subtotal:{" "}
            <PriceTag
              price={cart.price * cart.quantity}
              className="!text-gray-900"
            />
          </p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
          <button
            onClick={onDecrementQty}
            disabled={cart.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:text-primary disabled:opacity-30 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <span className="w-8 text-center font-bold text-gray-900">
            {cart.quantity}
          </span>
          <button
            onClick={onIncrementQty}
            className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
          title="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
