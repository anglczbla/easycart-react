import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "./useProduct";

export const useProductActions = () => {
  const queryClient = useQueryClient();
  const addProductMutation = useAddProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const deleteProductMutation = useDeleteProductMutation();

  const handleAddProduct = (formData: FormData, onSuccess?: () => void) => {
    addProductMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Success add product!");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        onSuccess?.();
      },
      onError: (error: any) => {
        console.error(error);
      },
    });
  };

  const handleUpdateProduct = (
    id: string,
    formData: FormData,
    onSuccess?: () => void,
  ) => {
    updateProductMutation.mutate(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Success edit product!");
          queryClient.invalidateQueries({ queryKey: ["products"] });
          onSuccess?.();
        },
      },
    );
  };

  const handleDeleteProduct = (id: string) => {
    deleteProductMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Success delete product!");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    });
  };

  return {
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    isPendingAdd: addProductMutation.isPending,
    isPendingUpdate: updateProductMutation.isPending,
    errorsAdd: (addProductMutation.error as any)?.response?.data?.errors,
    errorsUpdate: (updateProductMutation.error as any)?.response?.data?.errors,
  };
};
