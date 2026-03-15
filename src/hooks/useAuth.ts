import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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

export const useRegisterMutation = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (newUser: RegisterInput) => {
      return apiClient.post("/register", newUser);
    },
    onSuccess: (data) => {
      alert("success register!");
      if (options?.onSuccess) options.onSuccess(data);
      navigate("/login");
    },
    onError: (error: any) => {
      if (options?.onError) options.onError(error);
      console.error(error.response?.data);
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
