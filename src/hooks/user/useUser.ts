import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/axios";

export interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  city: string;
  avatar: string;
}

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
