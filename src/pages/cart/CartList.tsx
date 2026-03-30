import { useNavigate } from "react-router-dom";
import { useCartActions, useGetCartById } from "../../hooks/cart/useCart";
import Button from "../ui/Button";
import PriceTag from "../ui/PriceTag";
import CartItem from "./CartItem";

const CartList = () => {
  const cart = useGetCartById();
  const navigate = useNavigate();
  const { deleteItemCart, updateQtyItemCart, errorMessage } = useCartActions();
  const data = cart.data || [];

  const totalPrice = data.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    navigate("/order");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          My Cart
          <span className="text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
            {data.length} items
          </span>
        </h1>
        {data.length > 0 && (
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline text-sm font-medium"
          >
            Continue Shopping
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium text-center border border-red-100">
          {errorMessage}
        </div>
      )}

      {data.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button onClick={() => navigate("/")} name="Browse Products" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-15">
          <div className="lg:col-span-2">
            {data.map((item) => (
              <CartItem
                key={item.cart_id}
                cart={item}
                onDelete={() =>
                  deleteItemCart({
                    id: item.cart_id,
                    product_id: item.product_id,
                  })
                }
                onIncrementQty={() =>
                  updateQtyItemCart({
                    id: item.cart_id,
                    quantity: item.quantity + 1,
                    product_id: item.product_id,
                  })
                }
                onDecrementQty={() =>
                  updateQtyItemCart({
                    id: item.cart_id,
                    quantity: item.quantity - 1,
                    product_id: item.product_id,
                  })
                }
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-6 ">
              <h2 className="text-xl font-bold mb-6">Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <PriceTag
                    price={totalPrice}
                    className="!text-gray-900 font-medium"
                  />
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium font-bold">
                    Free
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className=" font-bold text-gray-900">Total</span>
                  <PriceTag
                    price={totalPrice}
                    className="text-2xl font-black lg:text-base"
                  />
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                name="Proceed to Checkout"
                className="w-full shadow-lg hover:shadow-primary/30"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartList;
