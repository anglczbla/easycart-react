import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "../search/useGlobalSearch";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  usegetAllProducts,
  useUpdateProductMutation,
  type ProductForm,
  type updateProduct,
} from "./useProduct";

export const useProductForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formProduct, setFormProduct] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [formEdit, setFormEdit] = useState<updateProduct>({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  const [showEdit, setShowEdit] = useState<string | null>();
  const [errors, setErrors] = useState<string[]>([]);
  const addProduct = useAddProductMutation();
  const updateProduct = useUpdateProductMutation();
  const deleteProduct = useDeleteProductMutation();
  const products = usegetAllProducts();
  const { query } = useGlobalSearch();

  const filterSearch = products.data?.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
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
    setErrors([]);
  };

  const handleFormEdit = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormEdit({
      ...formEdit,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    });
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

  const updatedProd = (updatedProduct: updateProduct) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.description ||
      !updatedProduct.price ||
      !updatedProduct.stock ||
      !updatedProduct.category
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
    filterSearch,
  };
};
