import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { OrderUsers } from "../types/types";

const useFilterByDate = (data: OrderUsers[]) => {
  const [date, setDate] = useSearchParams();

  const searching = date.get("date") || "";

  const filterDate = useMemo(() => {
    return searching !== ""
      ? data?.filter((item) =>
          item.created_at.includes(searching?.toLowerCase()),
        ) || []
      : data || [];
  }, [date, data]);

  const handleDate = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setDate({
      date: e.target.value,
    });
  };

  return { filterDate, date, handleDate };
};

export default useFilterByDate;
