import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductForm } from "../../types";
import { useGlobalSearch } from "../search/useGlobalSearch";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  usegetAllProducts,
  useUpdateProductMutation,
} from "./useProduct";

export const useProductForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formProduct, setFormProduct] = useState<ProductForm>({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [formEdit, setFormEdit] = useState<ProductForm>({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [showEdit, setShowEdit] = useState<string | null>();
  const [errors, setErrors] = useState<string[]>([]);
  const addProduct = useAddProductMutation();
  const updateProduct = useUpdateProductMutation();
  const deleteProduct = useDeleteProductMutation();
  const products = usegetAllProducts();
  const {
    inputValue,
    updateSearch,
    data: dataProduct,
    updateCategory,
    categoryValue,
    isLoading: isLoadingSearch,
  } = useGlobalSearch();

  const handleSearch = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    updateSearch(e.target.value);
  };

  const handleCategory = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    updateCategory(e.target.value);
  };

  const toggleEdit = (id: string) => {
    const product = products.data?.find((prod) => prod.id === id);

    setShowEdit(id);

    if (product) {
      setFormEdit({
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
      });
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
    setErrors([]);
  };

  const handleFormEdit = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormEdit({ ...formEdit, [name]: value });
    setErrors([]);
  };

  const submitProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formProduct.name ||
      !formProduct.description ||
      !formProduct.price ||
      !formProduct.stock ||
      !formProduct.category
    ) {
      return setErrors(["All fields are required!"]);
    }

    const newData = {
      name: formProduct.name,
      description: formProduct.description,
      price: Number(formProduct.price),
      stock: Number(formProduct.stock),
      category: formProduct.category,
    };

    addProduct.mutate(newData, {
      onSuccess: () => {
        alert("success add product!");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setFormProduct({
          id: "",
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
        });
        setErrors([]);
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        setErrors((prev) => [...prev, msg]);
      },
    });
  };

  const updatedProd = (updatedProduct: ProductForm) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.description ||
      !updatedProduct.price ||
      !updatedProduct.stock ||
      !updatedProduct.category
    ) {
      return setErrors(["All fields are required!"]);
    }

    const newData = {
      id: updatedProduct.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: Number(updatedProduct.price),
      stock: Number(updatedProduct.stock),
      category: updatedProduct.category,
    };

    updateProduct.mutate(newData, {
      onSuccess: (data) => {
        console.log(data.data);

        alert("success edit products");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setShowEdit(null);
        setFormEdit({
          id: "",
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
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
    dataProduct,
    inputValue,
    handleSearch,
    handleCategory,
    categoryValue,
    isLoadingSearch,
  };
};
