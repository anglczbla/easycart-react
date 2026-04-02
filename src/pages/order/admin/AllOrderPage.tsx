import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useGetAllOrders,
  useUpdateOrderMutation,
} from "../../../hooks/order/useOrder";
import useFilterByDate from "../../../hooks/useFilterByDate";
import type { Order } from "../../../types/types";
import AllOrderPageList from "./AllOrderPageList";

const AllOrderPage = () => {
  const { data } = useGetAllOrders();
  const updateOrder = useUpdateOrderMutation();
  const [status, setStatus] = useState("");
  const [showEdit, setShowEdit] = useState<any>(false);
  const queryClient = useQueryClient();
  const { filterDate, handleDate } = useFilterByDate(data || []);

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
        toast.success("success update status");
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
        <div>
          <h1>Filter by Date</h1>
          <input
            type="date"
            className="w-50 bg-white rounded-xl shadow-xl p-2"
            onChange={handleDate}
          />
        </div>
        {filterDate?.length == 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-full  flex items-center justify-center mx-auto overflow-hidden mb-4 p-5">
              <h1 className="flex justify-center items-center font-bold text-xl text-gray-600">
                Order Empty
              </h1>
            </div>
          </div>
        ) : (
          filterDate?.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg p-5">
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
          ))
        )}
      </div>
    </div>
  );
};

export default AllOrderPage;
