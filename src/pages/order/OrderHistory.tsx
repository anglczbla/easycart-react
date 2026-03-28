import { useGetHistoryOrders } from "../../hooks/order/useOrder";

const OrderHistory = () => {
  const { data } = useGetHistoryOrders();

  console.log("history", data);

  return (
    <div>
      <div>
        {data?.map((item) => (
          <div key={item.id}>
            <ul>
              <li>
                <img src={item.product_image} alt={item.product_image} />
              </li>
              <li>Product: {item.product_name}</li>
              <li>Qty: {item.quantity}</li>
              <li>Address: {item.shipping_address}</li>
              <li>Total: {item.total_price}</li>
              <li>Status: {item.status}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
