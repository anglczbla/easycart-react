import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetCartById } from "../../hooks/cart/useCart";
import { useOrderActions } from "../../hooks/order/useOrder";
import { useUserForm } from "../../hooks/user/useUserForm";
import Button from "../ui/Button";
import PriceTag from "../ui/PriceTag";

const OrderPage = () => {
  const { data } = useUserForm();
  const { data: orderData } = useGetCartById();
  const { creatingOrder, errorMessage } = useOrderActions();

  const totalPrice =
    orderData?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 lg:py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

      {errorMessage && (
        <p className="text-red-500 text-center font-bold">{errorMessage}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Shipping Address
              </h2>
              <Button
                onClick={() => navigate("/profile")}
                name="Change"
                className="py-1.5! px-4! text-sm rounded-lg! bg-gray-100 text-gray-700! hover:bg-gray-200 shadow-none border-none"
              />
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-gray-900 font-medium mb-1">
                Name: {data?.username}
              </p>
              <p className="text-gray-600 text-sm leading-relsaxed">
                Address: {data?.address} - {data?.city}
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <h2 className="text-lg font-bold p-6 border-b border-gray-50">
              Order Summary
            </h2>
            <div className="divide-y divide-gray-50">
              {orderData?.map((item) => (
                <div key={item.cart_id} className="p-6 flex gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="grow">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <PriceTag
                        price={item.price * item.quantity}
                        className="text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-6">Order Total</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <PriceTag
                  price={totalPrice}
                  className="text-gray-900! font-medium"
                />
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <PriceTag price={totalPrice} className="text-2xl font-black" />
              </div>
            </div>

            <Button
              onClick={creatingOrder}
              disabled={!orderData || orderData.length === 0}
              className="w-full shadow-lg hover:shadow-primary/30"
              name="Place Order"
            />

            <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest font-bold">
              Secure Checkout • 100% Satisfaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
