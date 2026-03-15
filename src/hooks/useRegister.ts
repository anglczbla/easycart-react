import { useState } from "react";
import { type RegisterInput, useRegisterMutation } from "../hooks/useAuth";
export const useRegister = () => {
  const useRegister = useRegisterMutation();
  const [formRegist, setFormRegist] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleRegist = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormRegist({ ...formRegist, [name]: value });
  };

  const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRegist.username || !formRegist.email || !formRegist.password) {
      return alert("all fields are required!");
    }
    useRegister.mutate(formRegist);
    setFormRegist({
      username: "",
      email: "",
      password: "",
    });
  };

  const helperPassword = () => {
    setShowPassword(!showPassword);
  };

  return {
    helperPassword,
    showPassword,
    formRegist,
    submitRegister,
    handleRegist,
    isPending: useRegister.isPending,
  };
};
