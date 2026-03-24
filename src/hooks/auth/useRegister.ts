import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./useAuth";
import type { RegisterInput } from "../../types";

export const useRegister = () => {
  const navigate = useNavigate();
  const mutation = useRegisterMutation();

  const [formRegist, setFormRegist] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
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
    if (errors.length > 0) setErrors([]);
  };

  const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRegist.username || !formRegist.email || !formRegist.password) {
      return setErrors(["All fields are required!"]);
    }

    setErrors([]);

    mutation.mutate(formRegist, {
      onSuccess: () => {
        alert("Success Register!");
        setFormRegist({ username: "", email: "", password: "" });
        setErrors([]);
        navigate("/login");
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message || "registration failed";
        setErrors([msg]);
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
