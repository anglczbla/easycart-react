import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../lib/axios";
import type { Order, OrderUsers } from "../../types/types";

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
  return useQuery<Order[]>({
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
  return useMutation({
    mutationFn: () => {
      return apiClient.post("/orders");
    },
  });
};

export const useUpdateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: Order) => {
      return apiClient.put(`/orders/${data.id}`, { status: data.status });
    },
  });
};

export const useOrderActions = () => {
  const queryClient = useQueryClient();
  const createOrder = useCreateOrderMutation();

  const creatingOrder = () => {
    createOrder.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["order"] });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        alert("success create order");
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        console.error(msg);
      },
    });
  };

  return {
    creatingOrder,
    errorMessage: (createOrder.error as any)?.response?.data?.message,
  };
};
