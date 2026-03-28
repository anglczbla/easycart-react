import { useNavigate } from "react-router-dom";
import { useGetCartById } from "../../hooks/cart/useCart";
import { useOrderActions } from "../../hooks/order/useOrder";
import { useUserForm } from "../../hooks/user/useUserForm";
import Button from "../ui/Button";

const OrderPage = () => {
  const { data } = useUserForm();
  const { data: orderData } = useGetCartById();
  const { creatingOrder, errorMessage } = useOrderActions();

  const totalPrice =
    orderData?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;

  const navigate = useNavigate();
  return (
    <div>
      <div>Order Data</div>
      {errorMessage && (
        <div className=" text-red-500 font-bold p-2 mt-2">{errorMessage}</div>
      )}
      <div>
        <ul>
          <li>
            Address: {data?.address} - {data?.city}
          </li>
          <Button onClick={() => navigate("/profile")} name="Edit Address" />

          {orderData?.map((item) => (
            <div key={item.cart_id}>
              <ul>
                <li>
                  <img src={item.image} alt={item.image} />
                </li>
                <li>Name: {item.name}</li>
                <li>Price: {item.price}</li>
                <li>Quantity: {item.quantity}</li>
              </ul>
            </div>
          ))}
          <p>Total: {totalPrice}</p>
          <Button
            onClick={creatingOrder}
            disabled={!orderData || orderData.length === 0}
            className="mt-4"
            name="Create Order"
          />
        </ul>
      </div>
    </div>
  );
};

export default OrderPage;
