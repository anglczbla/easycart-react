import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { User } from "./useUser";
import { useAddProfileMutation, useCurrentUser } from "./useUser";
export const useUserForm = () => {
  const queryClient = useQueryClient();
  const addProfile = useAddProfileMutation();
  const profile = useCurrentUser();
  console.log("profile", profile);

  const [errors, setErrors] = useState<string[]>([]);
  const [formProfile, setFormProfile] = useState<User>({
    email: "",
    username: "",
    phone: "",
    address: "",
    city: "",
    avatar: "",
  });

  const handleFormProfile = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormProfile({ ...formProfile, [name]: value });
    setErrors([]);
  };
  const updateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formProfile.email ||
      !formProfile.username ||
      !formProfile.phone ||
      !formProfile.address
    ) {
      return setErrors(["All fields are required!"]);
    }

    addProfile.mutate(formProfile, {
      onSuccess: () => {
        alert("success add profile");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setFormProfile({
          email: "",
          username: "",
          phone: "",
          address: "",
          city: "",
          avatar: "",
        });
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        setErrors((prev) => [...prev, msg]);
      },
    });
  };

  return {
    formProfile,
    handleFormProfile,
    updateProfile,
    data: profile.data,
    errors,
    isPending: profile.isPending,
  };
};
