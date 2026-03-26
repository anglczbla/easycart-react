import { useGetAllOrders, useOrderActions } from "../../hooks/order/useOrder";

const AllOrderPage = () => {
  const { data } = useGetAllOrders();
  const { updateOrder } = useOrderActions();

  console.log("all orders", data);

  return <div>AllOrderPage</div>;
};

export default AllOrderPage;
