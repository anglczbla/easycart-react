import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import apiClient from "../../lib/axios";
import type { ApiError, Order, OrderUsers } from "../../types/types";

export const useGetAllOrders = () => {
  return useQuery<OrderUsers[]>({
    queryKey: ["order", "all"],
    queryFn: async () => {
      const res = await apiClient.get("/orders/all");
      return res.data.data;
    },
  });
};

export const useGetHistoryOrders = () => {
  return useQuery<OrderUsers[]>({
    queryKey: ["order", "history"],
    queryFn: async () => {
      const res = await apiClient.get(`/orders`);
      return res.data.data;
    },
  });
};

export const useGetOrderById = (orderId: string) => {
  return useQuery<Order>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await apiClient.get(`/orders/${orderId}`);
      return res.data.data;
    },
  });
};

export const useCreateOrderMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, FormData>({
    mutationFn: (image: FormData) => {
      return apiClient.post("/orders", image);
    },
  });
};

export const useUpdateOrderMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, Order>({
    mutationFn: (data: Order) => {
      return apiClient.put(`/orders/${data.id}`, { status: data.status });
    },
  });
};
