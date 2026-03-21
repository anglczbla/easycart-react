import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  usegetAllCategories,
  useUpdateCategoryMutation,
  type Category,
} from "./useCategory";

export const useCategoryForm = () => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
  });
  const [editCategory, setEditCategory] = useState<Category>({
    id: "",
    name: "",
  });
  const [showEdit, setShowEdit] = useState<string | null>();
  const [errors, setErrors] = useState<string[]>([]);
  const onAddCategory = useAddCategoryMutation();
  const onUpdateCategory = useUpdateCategoryMutation();
  const onDeleteCategory = useDeleteCategoryMutation();
  const categories = usegetAllCategories();

  const toggleEditCategory = (id: string) => {
    const category = categories.data?.find((cat) => cat.id == id);
    setShowEdit(id);

    if (category) {
      setEditCategory(category);
    }
  };

  const handleChangeCategory = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    setErrors([]);
  };

  const handleEditCategory = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditCategory({ ...editCategory, [name]: value });
    setErrors([]);
  };

  const submitCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category) {
      return alert("category is required");
    }

    onAddCategory.mutate(category, {
      onSuccess: () => {
        alert("success add category!");
        queryClient.invalidateQueries({ queryKey: ["category"] });
        setCategory({
          id: "",
          name: "",
        });
        setErrors([]);
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        console.error(msg);
        setErrors([...errors, msg]);
      },
    });
  };

  const updateCategory = (category: Category) => {
    if (!category) {
      return alert("category is required");
    }

    onUpdateCategory.mutate(category, {
      onSuccess: () => {
        alert("success update category!");
        queryClient.invalidateQueries({ queryKey: ["category"] });
        setShowEdit(null);
        setCategory({
          id: "",
          name: "",
        });
        setErrors([]);
      },

      onError: (error: any) => {
        const msg = error.response?.data?.message;
        console.error(msg);
        setErrors([...errors, msg]);
      },
    });
  };

  const deleteCategory = (id: string) => {
    onDeleteCategory.mutate(id, {
      onSuccess: () => {
        alert("success delete category!");
        queryClient.invalidateQueries({ queryKey: ["category"] });
        setErrors([]);
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        console.error(msg);
        setErrors([...errors, msg]);
      },
    });
  };

  return {
    categoriesProduct: categories.data,
    category,
    editCategory,
    showEdit,
    toggleEditCategory,
    submitCategory,
    isPendingAddCategory: onAddCategory.isPending,
    updateCategory,
    isPendingUpdateCategory: onUpdateCategory.isPending,
    deleteCategory,
    isPendingDeleteCategory: onDeleteCategory.isPending,
    handleChangeCategory,
    handleEditCategory,
    errors,
  };
};
