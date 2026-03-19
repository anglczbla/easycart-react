import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";

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
      const res = await apiClient.get("/users/me");
      return res.data;
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (newUser: RegisterInput) =>
      apiClient.post("/auth/register", newUser),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (newLogin: LoginInput) =>
      apiClient.post("/auth/login", newLogin),
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: (id: string) => apiClient.post("/auth/logout", { id }),
  });
};
