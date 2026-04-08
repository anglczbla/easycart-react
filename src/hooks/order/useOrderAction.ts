import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { ApiError, Order } from "../../types/types";
import { useGetCartById } from "../cart/useCart";
import {
  useCreateOrderMutation,
  useGetAllOrders,
  useUpdateOrderMutation,
} from "./useOrder";
import { AxiosError } from "axios";

export const useOrderActions = () => {
  const navigate = useNavigate();
  const { data } = useGetAllOrders();
  const { data: orderData } = useGetCartById();
  const queryClient = useQueryClient();
  const createOrder = useCreateOrderMutation();
  const updateOrder = useUpdateOrderMutation();
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [showEdit, setShowEdit] = useState<string | false>(false);

  const totalPrice =
    orderData?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
  };

  const toggleEdit = (id: string, status: string) => {
    setShowEdit(id);
    setStatus(status);
  };

  const handleChangeStatus = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setStatus(e.target.value);
  };

  const cancelButton = () => {
    setShowEdit(false);
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const creatingOrder = (image: FormData) => {
    createOrder.mutate(image, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["order"] });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("success create order");
        navigate("/order-history");
      },
      onError: (error: AxiosError<ApiError>) => {
        const msg = error.response?.data?.message || "An error occurred";
        console.error(msg);
      },
    });
  };

  const handlePlaceOrder = () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    creatingOrder(formData);
  };

  const updatingOrder = (data: Order) => {
    updateOrder.mutate(data, {
      onSuccess: () => {
        toast.success("success update status");
        queryClient.invalidateQueries({ queryKey: ["order"] });
        queryClient.invalidateQueries({ queryKey: ["all"] });
        setShowEdit(false);
      },
      onError: (error: AxiosError<ApiError>) => {
        const msg = error.response?.data?.message || "An error occurred";
        console.error(msg);
      },
    });
  };

  return {
    creatingOrder,
    errorMessage: createOrder.error?.response?.data?.message,
    handleImage,
    image,
    updatingOrder,
    toggleEdit,
    handleChangeStatus,
    cancelButton,
    showEdit,
    status,
    totalPrice,
    handlePlaceOrder,
    goToProfile,
    data,
  };
};
