import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProduct } from "../product/useProduct";

export const useGlobalSearch = () => {
  const [search, setSearch] = useSearchParams();
  const query = search.get("q") || "";
  const category = search.get("category") || "";

  const [categoryValue, setCategoryValue] = useState(category);
  const [inputValue, setInputValue] = useState(query);

  const { data, isLoading } = useSearchProduct(query, category);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch({ q: inputValue, category: categoryValue });
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, categoryValue, setSearch]);

  const updateSearch = (value: string) => setInputValue(value);

  const updateCategory = (value: string) => setCategoryValue(value);

  return {
    inputValue,
    updateSearch,
    data,
    updateCategory,
    categoryValue,
    isLoading,
  };
};
