import type { AllOrderPageListProps } from "../../../types/types";
import Button from "../../ui/Button";
import Date from "../../ui/Date";
import PriceTag from "../../ui/PriceTag";

const AllOrderPageList = ({
  item,
  updatingOrder,
  toggleEdit,
  cancelButton,
  showEdit,
  status,
  handleChangeStatus,
}: AllOrderPageListProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Customer
              </span>
              <Date date={item.created_at} />
            </div>
            <p className="font-semibold text-gray-900">{item.customer_name}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Product
            </span>
            <p className="text-gray-700">
              {item.product_name}{" "}
              <span className="text-gray-400 text-sm">(x{item.quantity})</span>
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Total Amount
            </span>
            <PriceTag price={item.total_price} className="text-lg" />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Shipping Address
            </span>
            <p className="text-gray-600 text-sm">{item.shipping_address}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 min-w-37.5">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
              item.status === "accept"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {item.status}
          </span>
          <Button
            name="Update Status"
            className="py-2! px-4! text-xs rounded-lg!"
            onClick={() => toggleEdit(item.id, item.status)}
          />
        </div>
      </div>

      {showEdit === item.id && (
        <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="w-full sm:w-64">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                New Status
              </label>
              <select
                name="status"
                value={status}
                onChange={handleChangeStatus}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="accept">Accepted</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button
                name="Save Changes"
                className="py-2.5! px-6! text-sm rounded-lg!"
                onClick={() => updatingOrder({ ...item, status })}
              />
              <Button
                name="Cancel"
                className="py-2.5! px-6! text-sm rounded-lg! bg-white text-gray-500! border border-gray-200 shadow-none"
                onClick={cancelButton}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrderPageList;
