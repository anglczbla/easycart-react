import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken } from "../../store/authSlice";
import type { ApiError, LoginInput } from "../../types/types";
import { useLoginMutation } from "./useAuth";
import { AxiosError } from "axios";

export const useLogin = () => {
  const navigate = useNavigate();
  const mutation = useLoginMutation();
  const dispatch = useDispatch();

  const [formLogin, setFormLogin] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState(false);

  const goToRegister = () => {
    navigate("/register");
  };

  const handleLogin = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormLogin({ ...formLogin, [name]: value });
    if (errors) setErrors({});
  };

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formLogin.email || !formLogin.password) {
      return setErrors({ message: ["all fields are required"] });
    }

    setErrors({});

    mutation.mutate(formLogin, {
      onSuccess: (data) => {
        localStorage.setItem("userData", JSON.stringify(data.data));

        dispatch(addToken(data.data));

        toast.success("Success Login!");
        setFormLogin({ email: "", password: "" });
        setErrors({});
        navigate("/");
      },
      onError: (error: AxiosError<ApiError>) => {
        const errorData = error.response?.data;
        if (errorData?.errors) {
          setErrors(errorData.errors);
        } else if (errorData?.message) {
          setErrors({ message: [errorData.message] });
        } else {
          setErrors({ message: ["An error occurred"] });
        }
      },
    });
  };

  return {
    formLogin,
    submitLogin,
    handleLogin,
    helperPassword: () => setShowPassword((prev) => !prev),
    showPassword,
    isPending: mutation.isPending,
    errors,
    goToRegister,
    errorMessage: mutation.error?.response?.data?.message,
  };
};
