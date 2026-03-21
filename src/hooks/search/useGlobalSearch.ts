import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProduct } from "../product/useProduct";

export const useGlobalSearch = (syncWithUrl = true) => {
  const [search, setSearch] = useSearchParams();

  const query = syncWithUrl ? search.get("q") || "" : "";
  const category = syncWithUrl ? search.get("category") || "" : "";

  const [categoryValue, setCategoryValue] = useState(category);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    if (syncWithUrl) {
      setInputValue(query);
    }
  }, [query, syncWithUrl]);

  useEffect(() => {
    if (syncWithUrl) {
      setCategoryValue(category);
    }
  }, [category, syncWithUrl]);

  const effectiveQuery = syncWithUrl ? query : inputValue;
  const effectiveCategory = syncWithUrl ? category : categoryValue;

  const { data, isLoading, isFetching } = useSearchProduct(
    effectiveQuery,
    effectiveCategory,
  );

  useEffect(() => {
    if (!syncWithUrl) return;

    if (inputValue === query && categoryValue === category) return;

    const timer = setTimeout(() => {
      setSearch((prev) => {
        const newParams = new URLSearchParams(prev);
        if (inputValue) {
          newParams.set("q", inputValue);
        } else {
          newParams.delete("q");
        }

        if (categoryValue) {
          newParams.set("category", categoryValue);
        } else {
          newParams.delete("category");
        }
        return newParams;
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, categoryValue, setSearch, query, category, syncWithUrl]);

  const updateSearch = (value: string) => setInputValue(value);

  const updateCategory = (value: string) => setCategoryValue(value);

  const resetSearch = () => {
    setInputValue("");
    setCategoryValue("");
  };

  return {
    inputValue,
    updateSearch,
    resetSearch,
    data,
    query: effectiveQuery,
    updateCategory,
    categoryValue,
    isLoading,
    isFetching,
  };
};
