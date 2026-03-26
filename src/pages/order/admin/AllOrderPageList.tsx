import type { Order, OrderUsers } from "../../../types/types";
import Button from "../../ui/Button";

interface AllOrderPageListProps {
  item: OrderUsers;
  updatingOrder: (data: Order) => void;
  toggleEdit: (id: string, status: string) => void;
  cancelButton: () => void;
  showEdit: string | false;
  status: string;
  handleChangeStatus: React.ChangeEventHandler<HTMLSelectElement>;
}

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
    <div>
      <ul>
        <li>Customer Name: {item.customer_name}</li>
        <li>Name Product: {item.product_name}</li>
        <li>Qty: {item.quantity}</li>
        <li>Address: {item.shipping_address}</li>
        <li>Status: {item.status}</li>
      </ul>
      <Button
        name="Edit Status"
        className="mt-3"
        onClick={() => toggleEdit(item.id, item.status)}
      />
      {showEdit === item.id ? (
        <div>
          <select name="status" value={status} onChange={handleChangeStatus}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="accept">Accepted</option>
          </select>

          <div className="flex gap-5">
            <Button
              name="Update"
              onClick={() => updatingOrder({ ...item, status })}
            />
            <Button
              name="Cancel"
              className="bg-red-500"
              onClick={cancelButton}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AllOrderPageList;
