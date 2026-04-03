import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItemProps } from "../../types/types";
import PriceTag from "../../components/ui/PriceTag";

const CartItem = ({
  cart,
  onDelete,
  onIncrementQty,
  onDecrementQty,
}: CartItemProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 flex flex-col sm:flex-row gap-6 items-center transition-all hover:shadow-md">
      <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
        <img
          src={cart.image}
          alt={cart.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="grow text-center sm:text-left">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{cart.name}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-center sm:justify-start">
          <PriceTag price={cart.price} className="text-primary font-semibold" />
          <span className="hidden sm:inline text-gray-300">|</span>
          <p className="text-sm text-gray-500">
            Subtotal:{" "}
            <PriceTag
              price={cart.price * cart.quantity}
              className="text-gray-900!"
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
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-bold text-gray-900">
            {cart.quantity}
          </span>
          <button
            onClick={onIncrementQty}
            className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:text-primary transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
          title="Remove item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
