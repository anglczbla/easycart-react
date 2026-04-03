import downloadImage from "../../utils/download";
import { useGetHistoryOrders } from "../../hooks/order/useOrder";
import useFilterByDate from "../../hooks/useFilterByDate";
import Button from "../../components/ui/Button";
import DateDisplay from "../../components/ui/DateDisplay";
import PriceTag from "../../components/ui/PriceTag";

const OrderHistory = () => {
  const { data } = useGetHistoryOrders();
  const { handleDate, filterDate } = useFilterByDate(data || []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <input type="date" onChange={handleDate} />
      {filterDate.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No order history found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filterDate.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 flex gap-6"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {item.product_name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Quantity: {item.quantity}
                  </p>

                  <DateDisplay date={item.created_at} />

                  <p className="text-sm text-gray-600 line-clamp-1">
                    <span className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider block">
                      {item.shipping_address}
                    </span>
                  </p>

                  {item.image && (
                    <Button
                      name="Download Proof"
                      onClick={() => downloadImage(item.image)}
                      className="py-2! px-4! text-xs rounded-lg! mt-2"
                    />
                  )}
                </div>
                <div className="flex flex-col items-end justify-between">
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block mb-1">
                      Total Amount
                    </span>
                    <PriceTag price={item.total_price} className="text-xl" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      item.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
