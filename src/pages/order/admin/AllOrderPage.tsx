import { useOrderActions } from "../../../hooks/order/useOrderAction";
import useFilterByDate from "../../../hooks/useFilterByDate";
import AllOrderPageList from "./AllOrderPageList";

const AllOrderPage = () => {
  const {
    updatingOrder,
    toggleEdit,
    handleChangeStatus,
    cancelButton,
    showEdit,
    status,
    data,
  } = useOrderActions();
  const { filterDate, handleDate } = useFilterByDate(data || []);

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
