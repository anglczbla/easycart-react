import { useNavigate } from "react-router-dom";
import { useCartActions, useGetCartById } from "../../hooks/cart/useCart";
import Button from "../ui/Button";
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
    <div>
      <div>
        {errorMessage && (
          <div className="font-bold text-red-600 text-center">
            {errorMessage}
          </div>
        )}
        {data?.length <= 0 ? (
          <p>Cart is Empty</p>
        ) : (
          <>
            <p className="text-center font-bold text-lg">My Cart</p>
            {data.map((item) => (
              <div>
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
                  totalPrice={totalPrice}
                />
              </div>
            ))}
            <p className="font-bold text-lg p-2"> Total: {totalPrice}</p>
            <Button onClick={handleCheckout} name="Check Out" />
          </>
        )}
      </div>
    </div>
  );
};
export default CartList;
