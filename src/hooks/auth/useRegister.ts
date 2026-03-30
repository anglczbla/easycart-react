import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { RegisterInput } from "../../types/types";
import { useRegisterMutation } from "./useAuth";

export const useRegister = () => {
  const navigate = useNavigate();
  const mutation = useRegisterMutation();

  const [formRegist, setFormRegist] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState(false);

  const goToLogin = () => {
    navigate("/login");
  };

  const handleRegist = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormRegist({ ...formRegist, [name]: value });
    if (errors) setErrors({});
  };

  const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRegist.username || !formRegist.email || !formRegist.password) {
      return setErrors({ message: ["all fields are required"] });
    }

    setErrors({});

    mutation.mutate(formRegist, {
      onSuccess: () => {
        toast.success("Success Register!");
        setFormRegist({ username: "", email: "", password: "" });
        setErrors({});
        navigate("/login");
      },
      onError: (error: any) => {
        setErrors(error.response?.data?.errors);
      },
    });
  };

  return {
    formRegist,
    submitRegister,
    handleRegist,
    helperPassword: () => setShowPassword((prev) => !prev),
    showPassword,
    isPending: mutation.isPending,
    errors,
    goToLogin,
  };
};
