import { useMutation } from "@tanstack/react-query";
import apiClient from "../../lib/axios";

export interface RegisterInput {
  email: string;
  username: string;
  password?: string;
}

export interface LoginInput {
  email: string;
  password?: string;
}

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
