import { useSearchParams } from "react-router-dom";

export const useGlobalSearch = () => {
  const [search, setSearch] = useSearchParams();
  const query = search.get("q") || "";

  const updateSearch = (value: string) => {
    setSearch({ q: value });
  };

  return { query, updateSearch };
};
