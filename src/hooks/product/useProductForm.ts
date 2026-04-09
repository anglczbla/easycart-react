import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product, ProductForm } from "../../types/types";
import { usegetAllCategories } from "../category/useCategory";
import { useGlobalSearch } from "../search/useGlobalSearch";
import { usegetAllProducts } from "./useProduct";
import { useProductActions } from "./useProductActions";

export const useProductForm = (initialProduct?: Product) => {
  const navigate = useNavigate();
  const {
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    isPendingAdd,
    isPendingUpdate,
    errorsAdd,
    errorsUpdate,
  } = useProductActions();

  console.log("err add", errorsAdd);

  const { data: products, isLoading: isLoadingProducts } = usegetAllProducts();
  const { data: categories, isLoading: isLoadingCategories } =
    usegetAllCategories();
  const search = useGlobalSearch();

  const [formAdd, setFormAdd] = useState<ProductForm>({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const handleFormAdd = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormAdd((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formAdd.name);
    formData.append("description", formAdd.description);
    formData.append("price", formAdd.price);
    formData.append("stock", formAdd.stock);
    formData.append("category", formAdd.category);
    if (image) formData.append("image", image);

    handleAddProduct(formData, () => {
      setFormAdd({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      setImage(null);
    });
  };

  const [formEdit, setFormEdit] = useState<ProductForm>(
    initialProduct
      ? {
          id: initialProduct.id,
          name: initialProduct.name,
          category: initialProduct.category,
          description: initialProduct.description,
          price: initialProduct.price.toString(),
          stock: initialProduct.stock.toString(),
        }
      : {
          id: "",
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
        },
  );
  const [editImage, setEditImage] = useState<File | null>(null);

  const handleFormEdit = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setEditImage(e.target.files[0]);
  };

  const submitUpdate = (onSuccess?: () => void) => {
    const formData = new FormData();
    formData.append("name", formEdit.name);
    formData.append("description", formEdit.description);
    formData.append("price", formEdit.price);
    formData.append("stock", formEdit.stock);
    formData.append("category", formEdit.category);
    if (editImage) formData.append("image", editImage);

    handleUpdateProduct(formEdit.id, formData, onSuccess);
  };

  const goToDetail = (id: string) => navigate(`/products/${id}`);

  const displayProducts =
    search.inputValue || search.categoryValue
      ? search.data || []
      : products || [];

  return {
    products,
    categories,
    displayProducts,
    isLoading: isLoadingProducts || isLoadingCategories,

    search,

    formAdd,
    handleFormAdd,
    handleImageAdd,
    submitAdd,
    isPendingAdd,
    errorsAdd,

    formEdit,
    handleFormEdit,
    handleImageEdit,
    submitUpdate,
    isPendingUpdate,
    errorsUpdate,

    handleDeleteProduct,
    goToDetail,
  };
};
