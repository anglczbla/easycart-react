import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  usegetAllProducts,
  useUpdateProductMutation,
  type Products,
} from "./useProduct";

export const useProductForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formProduct, setFormProduct] = useState<Products>({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: "",
  });

  const [formEdit, setFormEdit] = useState<Products>({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: "",
  });

  const [showEdit, setShowEdit] = useState<string | null>();
  const [errors, setErrors] = useState<string[]>([]);
  const [search, setSearch] = useSearchParams();
  const addProduct = useAddProductMutation();
  const updateProduct = useUpdateProductMutation();
  const deleteProduct = useDeleteProductMutation();
  const products = usegetAllProducts();

  const searching = search.get("q") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      q: e.target.value,
    });
  };

  const filterSearch = products.data?.filter((p) =>
    p.name.includes(searching.toLocaleLowerCase()),
  );

  const toggleEdit = (id: string) => {
    const product = products.data?.find((prod) => prod.id == id);
    setShowEdit(id);

    if (product) {
      setFormEdit(product);
    }
  };

  const detailProd = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handleForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormProduct({ ...formProduct, [name]: value });
  };

  const handleFormEdit = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormEdit({ ...formEdit, [name]: value });
  };

  const submitProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formProduct.name ||
      !formProduct.description ||
      !formProduct.price ||
      !formProduct.stock ||
      !formProduct.categoryId
    ) {
      return setErrors(["All fields are required!"]);
    }

    addProduct.mutate(formProduct, {
      onSuccess: () => {
        alert("success add product!");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setFormProduct({
          id: "",
          name: "",
          description: "",
          price: 0,
          stock: 0,
          categoryId: "",
        });
        setErrors([]);
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        setErrors((prev) => [...prev, msg]);
      },
    });
  };

  const updatedProd = (updatedProduct: Products) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.description ||
      !updatedProduct.price ||
      !updatedProduct.stock ||
      !updatedProduct.categoryId
    ) {
      return setErrors(["All fields are required!"]);
    }

    updateProduct.mutate(updatedProduct, {
      onSuccess: () => {
        alert("success edit products");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setShowEdit(null);
        setFormEdit({
          id: "",
          name: "",
          description: "",
          price: 0,
          stock: 0,
          categoryId: "",
        });
        setErrors([]);
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        setErrors((prev) => [...prev, msg]);
      },
    });
  };

  const delProd = (id: string) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        alert("success delete products");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setErrors([]);
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        setErrors((prev) => [...prev, msg]);
      },
    });
  };

  return {
    formProduct,
    formEdit,
    handleForm,
    handleFormEdit,
    submitProduct,
    updatedProd,
    delProd,
    errors,
    toggleEdit,
    showEdit,
    isPending: addProduct.isPending,
    detailProd,
    data: products.data,
    searching,
    handleSearch,
    filterSearch,
  };
};
