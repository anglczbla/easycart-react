import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";
import type { User } from "../../types";

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
  return useMutation({
    mutationFn: (newProfile: User) => {
      return apiClient.put("/users", newProfile);
    },
  });
};
