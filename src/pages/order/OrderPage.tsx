import { useNavigate } from "react-router-dom";
import { useGetCartById } from "../../hooks/cart/useCart";
import { useOrderActions } from "../../hooks/order/useOrder";
import { useUserForm } from "../../hooks/user/useUserForm";

const OrderPage = () => {
  const { data } = useUserForm();
  const { data: orderData } = useGetCartById();
  const { creatingOrder } = useOrderActions();

  const totalPrice = orderData?.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const navigate = useNavigate();
  return (
    <div>
      <div>Order Data</div>
      <div>
        <ul>
          <li>
            Address: {data?.address} - {data?.city}
          </li>
          <button
            onClick={() => navigate("/profile")}
            className="text-base font-semibold text-secondary bg-primary py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
          >
            Edit Address
          </button>
          {orderData?.map((item) => (
            <div key={item.cart_id}>
              <ul>
                <li>Name: {item.name}</li>
                <li>Price: {item.price}</li>
                <li>Quantity: {item.quantity}</li>
              </ul>
            </div>
          ))}
          <p>Total: {totalPrice}</p>
          <button onClick={creatingOrder}>Create Order</button>
        </ul>
      </div>
    </div>
  );
};

export default OrderPage;
