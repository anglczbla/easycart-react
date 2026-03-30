import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { User } from "../../types/types";
import { useAddProfileMutation, useCurrentUser } from "./useUser";
export const useUserForm = () => {
  const queryClient = useQueryClient();
  const addProfile = useAddProfileMutation();
  const profile = useCurrentUser();

  const [errors, setErrors] = useState<Record<string, string[]>>({});
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
  const [image, setImage] = useState<File | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
  };

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
    setErrors({});
  };

  const updateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (image) {
      formData.append("avatar", image);
    }
    formData.append("username", formProfile.username);
    formData.append("email", formProfile.email);
    formData.append("phone", formProfile.phone);
    formData.append("address", formProfile.address);
    formData.append("city", formProfile.city);

    addProfile.mutate(formData, {
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
        setErrors(error.response?.data?.errors);
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
    handleImage,
  };
};
