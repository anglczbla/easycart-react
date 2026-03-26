import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useGetAllOrders,
  useUpdateOrderMutation,
} from "../../../hooks/order/useOrder";
import type { Order } from "../../../types/types";
import AllOrderPageList from "./AllOrderPageList";

const AllOrderPage = () => {
  const { data } = useGetAllOrders();
  const updateOrder = useUpdateOrderMutation();
  const [status, setStatus] = useState("");
  const [showEdit, setShowEdit] = useState<any>(false);
  const queryClient = useQueryClient();

  const toggleEdit = (id: string, status: string) => {
    setShowEdit(id);
    setStatus(status);
  };

  const handleChangeStatus = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setStatus(e.target.value);
  };

  const cancelButton = () => {
    setShowEdit(false);
  };

  const updatingOrder = (data: Order) => {
    updateOrder.mutate(data, {
      onSuccess: () => {
        alert("success update status");
        queryClient.invalidateQueries({ queryKey: ["order"] });
        queryClient.invalidateQueries({ queryKey: ["all"] });
        setShowEdit(false);
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        console.error(msg);
      },
    });
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-10">
        {data?.map((item) => (
          <div key={item.id} className=" bg-white rounded-xl shadow-lg p-5">
            <AllOrderPageList
              item={item}
              updatingOrder={updatingOrder}
              toggleEdit={toggleEdit}
              handleChangeStatus={handleChangeStatus}
              cancelButton={cancelButton}
              showEdit={showEdit}
              status={status}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrderPage;
