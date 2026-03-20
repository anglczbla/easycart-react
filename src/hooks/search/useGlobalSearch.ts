import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProduct } from "../product/useProduct";

export const useGlobalSearch = () => {
  const [search, setSearch] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const query = search.get("q") || "";
  const { data } = useSearchProduct(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch({ q: inputValue });
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const updateSearch = (value: string) => {
    setInputValue(value);
  };

  return { inputValue, updateSearch, data };
};
