import { ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import PriceTag from "../../components/ui/PriceTag";
import { useCartActions } from "../../hooks/cart/useCartAction";
import CartItem from "./CartItem";
import ErrorMessage from "../../components/ui/ErrorMessage";

const CartList = () => {
  const navigate = useNavigate();
  const {
    deleteItemCart,
    updateQtyItemCart,
    errorMessage,
    totalPrice,
    handleCheckout,
    data,
  } = useCartActions();

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-primary flex items-center gap-4">
            Shopping Cart
            <span className="text-xs font-bold bg-primary/5 text-primary-light px-4 py-1.5 rounded-full border border-primary/10">
              {data.length} {data.length === 1 ? 'item' : 'items'}
            </span>
          </h1>
        </div>
        {data.length > 0 && (
          <button
            onClick={() => navigate("/products")}
            className="flex items-center text-muted hover:text-primary transition-elegant font-semibold group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </button>
        )}
      </div>

      <ErrorMessage message={errorMessage} className="mb-8" />

      {data.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[40px] card-shadow border border-gray-50 flex flex-col items-center">
          <div className="bg-surface w-24 h-24 rounded-[32px] flex items-center justify-center mb-8 border border-gray-100">
            <ShoppingBag className="h-10 w-10 text-primary/20" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">
            Your cart is feeling light
          </h2>
          <p className="text-muted mb-10 max-w-xs font-medium">
            Discover our latest arrivals and find something special for yourself.
          </p>
          <Button 
            onClick={() => navigate("/products")} 
            name="Start Shopping" 
            className="!px-10 !py-4 shadow-xl shadow-primary/10"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
          <div className="xl:col-span-2 space-y-6">
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

          <div className="xl:col-span-1 lg:sticky lg:top-28">
            <div className="bg-white rounded-[40px] card-shadow border border-gray-100 p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-primary mb-8">Order Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-muted font-medium">
                  <span>Subtotal</span>
                  <PriceTag
                    price={totalPrice}
                    className="text-primary font-bold"
                  />
                </div>
                <div className="flex justify-between items-center text-muted font-medium">
                  <span>Shipping</span>
                  <span className="text-success font-bold px-3 py-1 bg-success/5 rounded-full text-xs border border-success/10 uppercase tracking-widest">Free</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary text-lg">Total</span>
                  <PriceTag
                    price={totalPrice}
                    className="text-3xl font-bold text-primary-light"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleCheckout}
                  className="w-full !py-4 !rounded-2xl shadow-xl shadow-primary/20 group"
                  name={
                    <div className="flex items-center justify-center gap-3">
                      <CreditCard size={20} />
                      <span>Proceed to Checkout</span>
                    </div>
                  }
                />
                <p className="text-center text-[10px] text-muted font-bold uppercase tracking-widest px-4">
                  Secure Checkout Guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartList;
