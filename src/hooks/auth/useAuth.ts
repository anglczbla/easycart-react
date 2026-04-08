import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import apiClient from "../../lib/axios";
import type { ApiError, LoginInput, RegisterInput } from "../../types/types";

export const useRegisterMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, RegisterInput>({
    mutationFn: (newUser: RegisterInput) =>
      apiClient.post("/auth/register", newUser),
  });
};

export const useLoginMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, LoginInput>({
    mutationFn: (newLogin: LoginInput) =>
      apiClient.post("/auth/login", newLogin),
  });
};

export const useLogoutMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, string>({
    mutationFn: (id: string) => apiClient.post("/auth/logout", { id }),
  });
};

