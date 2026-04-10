import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { CartItemProps } from "../../types/types";
import PriceTag from "../ui/PriceTag";

const CartItem = ({
  cart,
  onDelete,
  onIncrementQty,
  onDecrementQty,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(cart.quantity);

  return (
    <div className="bg-white rounded-4xl card-shadow border border-gray-100 p-6 flex flex-col sm:flex-row gap-8 items-center transition-elegant hover:shadow-xl group">
      <div className="w-32 h-32 bg-surface rounded-3xl overflow-hidden shrink-0 border border-gray-50 p-4">
        <img
          src={cart.image}
          alt={cart.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-elegant"
        />
      </div>

      <div className="grow text-center sm:text-left space-y-2">
        <h3 className="font-bold text-xl text-primary leading-tight">
          {cart.name}
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 justify-center sm:justify-start">
          <PriceTag
            price={cart.price}
            className="text-primary-light font-bold text-lg"
          />
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-200" />
          <p className="text-sm text-muted font-medium flex items-center gap-2">
            Total:
            <PriceTag
              price={cart.price * quantity}
              className="text-primary font-bold"
            />
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center bg-surface rounded-2xl p-1.5 border border-gray-100 shadow-sm">
          <button
            onClick={() => {
              const qty = quantity - 1;
              setQuantity(qty);
              onDecrementQty(qty);
            }}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-primary hover:text-primary-light disabled:opacity-30 transition-elegant shadow-sm border border-gray-50 cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-bold text-primary text-lg">
            {quantity}
          </span>
          <button
            onClick={() => {
              // sync = antri
              // asnyc = jalan bareng
              const qty = quantity + 1;
              setQuantity(qty);
              onIncrementQty(qty);

              // setQuantity(xxx + 1)
              // setQuantity(quantity + 1)
              // setQuantity((prevState) => prevState + 1);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-primary hover:text-primary-light transition-elegant shadow-sm border border-gray-50 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onDelete}
          className="p-3 text-muted hover:text-error transition-elegant rounded-2xl hover:bg-error/5 border border-transparent hover:border-error/10"
          title="Remove item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
