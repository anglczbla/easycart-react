import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";
import type { Order } from "../../types/types";

export const usGetAllOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await apiClient.get("/orders/all");
      return res.data.data;
    },
  });
};

export const useGetHistoryOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await apiClient.get(`/orders`);
      return res.data.data;
    },
  });
};

export const useGetOrderById = (userId: string) => {
  return useQuery<Order>({
    queryKey: ["order", userId],
    queryFn: async () => {
      const res = await apiClient.get(`/orders/${userId}`);
      return res.data.data;
    },
  });
};

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: Order) => {
      return apiClient.post("/orders", data);
    },
  });
};

export const useUpdateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: Order) => {
      return apiClient.put(`/orders/${data.id}`, data);
    },
  });
};
