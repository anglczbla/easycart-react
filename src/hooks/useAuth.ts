import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../lib/axios";

export const useCurrentUser = () => {
  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await apiClient.get("/me");
      return res.data;
    },
  });
};

export const useRegisterMutation = () => {
  useMutation({
    mutationFn: (newUser) => {
      return apiClient.post("/register", newUser);
    },
    onSuccess: () => {
      alert("success register!");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useLoginMutation = () => {
  useMutation({
    mutationFn: (newLogin) => {
      return apiClient.post("/login", newLogin);
    },
    onSuccess: () => {
      alert("success login");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const logoutMutation = () => {
  useMutation({
    mutationFn: (id) => {
      return apiClient.post("/logout", id);
    },
    onSuccess: () => {
      alert("success logout");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
