import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../lib/axios";

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface RegisterInput {
  email: string;
  username: string;
  password?: string;
}

export interface LoginInput {
  email: string;
  password?: string;
}

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await apiClient.get("/me");
      return res.data;
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (newUser: RegisterInput) => {
      return apiClient.post("/register", newUser);
    },
    onSuccess: () => {
      alert("success register!");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (newLogin: LoginInput) => {
      return apiClient.post("/login", newLogin);
    },
    onSuccess: () => {
      alert("success login");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return apiClient.post("/logout", { id });
    },
    onSuccess: () => {
      alert("success logout");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};
