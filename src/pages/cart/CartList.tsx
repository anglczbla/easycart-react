import { useCartActions, useGetCartById } from "../../hooks/cart/useCart";
import CartItem from "./CartItem";

const CartList = () => {
  const cart = useGetCartById();
  const { deleteItemCart, updateQtyItemCart } = useCartActions();
  const data = cart.data || [];

  const totalPrice = data.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <div>
        {data?.length <= 0 ? (
          <p>Cart is Empty</p>
        ) : (
          <>
            <p className="text-center font-bold text-lg">My Cart</p>
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
                totalPrice={totalPrice}
              />
            ))}
            <p className="font-bold text-lg p-2"> Total: {totalPrice}</p>
          </>
        )}
      </div>
    </div>
  );
};
export default CartList;
