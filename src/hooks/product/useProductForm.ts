import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    type Products,
    type UpdateProduct,
} from "./useProduct";

export const useProductForm = () => {
  const queryClient = useQueryClient();
  const [formProduct, setFormProduct] = useState<Products>({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  const [formEdit, setFormEdit] = useState<UpdateProduct>({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  const [showEdit, setShowEdit] = useState<any>();

  const [errors, setErrors] = useState<string[]>([]);
  const addProduct = useAddProductMutation();
  const updateProduct = useUpdateProductMutation();
  const deleteProduct = useDeleteProductMutation();

  const toggleEdit = (idx: number, product: UpdateProduct) => {
    setShowEdit(idx);
    setFormEdit(product);
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
      !formProduct.category
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

 const updatedProd = (id: string, formEdit: Omit<UpdateProduct, "id">) => {
    if (
      !formEdit.name ||
      !formEdit.description ||
      !formEdit.price ||
      !formEdit.stock ||
      !formEdit.category
    ) {
      return setErrors(["All fields are required!"]);
    }

    updateProduct.mutate(
      { id...formEdit },
      {
        onSuccess: () => {
          alert("success edit products");
          queryClient.invalidateQueries({ queryKey: ["products"] });
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
      },
    );
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
  };
};
