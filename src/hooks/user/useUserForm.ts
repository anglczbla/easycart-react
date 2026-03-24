import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { User } from "../../types/types";
import { useAddProfileMutation, useCurrentUser } from "./useUser";
export const useUserForm = () => {
  const queryClient = useQueryClient();
  const addProfile = useAddProfileMutation();
  const profile = useCurrentUser();

  const [errors, setErrors] = useState<string[]>([]);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [formProfile, setFormProfile] = useState<Omit<User, "role">>({
    id: "",
    email: "",
    username: "",
    phone: "",
    address: "",
    city: "",
    avatar: "",
  });

  const toggleEdit = (id: string) => {
    const data = profile?.data?.id === id;

    if (data) {
      setShowEdit(data);
      setFormProfile({ ...formProfile, ...profile?.data });
    }
  };

  const cancelButton = () => {
    setShowEdit(false);
  };

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

    addProfile.mutate(formProfile, {
      onSuccess: () => {
        alert("success add profile");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setShowEdit(false);
        setFormProfile({
          id: "",
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
    showEdit,
    toggleEdit,
    formProfile,
    handleFormProfile,
    updateProfile,
    data: profile.data,
    errors,
    isPending: profile.isPending,
    cancelButton,
  };
};
