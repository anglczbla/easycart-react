import { useCartActions, useGetCartById } from "../../hooks/cart/useCart";
import CartItem from "./CartItem";

const CartList = () => {
  const cart = useGetCartById();
  const { deleteItemCart } = useCartActions();
  const data = cart.data || [];

  return (
    <div>
      <div>
        {data?.length <= 0 ? (
          <p>Cart is Empty</p>
        ) : (
          <>
            <p>My Cart</p>
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
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default CartList;
