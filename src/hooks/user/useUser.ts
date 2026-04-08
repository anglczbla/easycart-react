import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";
import type { ApiError, User } from "../../types/types";
import { AxiosError, AxiosResponse } from "axios";

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiClient.get("/users");
      return res.data.data;
    },
  });
};

export const useAddProfileMutation = () => {
  return useMutation<AxiosResponse, AxiosError<ApiError>, FormData>({
    mutationFn: (newProfile: FormData) => {
      return apiClient.put("/users", newProfile);
    },
  });
};
