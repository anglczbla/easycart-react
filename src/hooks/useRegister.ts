import { useState } from "react";
import { type RegisterInput, useRegisterMutation } from "../hooks/useAuth";

export const useRegister = () => {
  const [formRegist, setFormRegist] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  console.log("isi errors", errors);

  const [showPassword, setShowPassword] = useState(false);

  const useRegister = useRegisterMutation({
    onSuccess: () => {
      setFormRegist({
        username: "",
        email: "",
        password: "",
      });
      setErrors([]);
    },
    onError: (error) => {
      const msg = error.response?.data.message;
      console.log("msg", msg);

      setErrors((prev) => [...prev, msg]);
    },
  });

  const handleRegist = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormRegist({ ...formRegist, [name]: value });

    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRegist.username || !formRegist.email || !formRegist.password) {
      return alert("all fields are required!");
    }
    useRegister.mutate(formRegist);
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
    errors,
  };
};
