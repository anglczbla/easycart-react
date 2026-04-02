import { useMemo, useState } from "react";
import type { OrderUsers } from "../types/types";

const useFilterByDate = (data: OrderUsers[]) => {
  const [date, setDate] = useState<string>("");

  const filterDate = useMemo(() => {
    return date !== ""
      ? data?.filter((item) => item.created_at.includes(date?.toLowerCase())) ||
          []
      : data || [];
  }, [date, data]);

  const handleDate = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setDate(e.target.value);
  };

  return { filterDate, date, handleDate };
};

export default useFilterByDate;
