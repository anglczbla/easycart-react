import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken } from "../../store/authSlice";
import { useLoginMutation, type LoginInput } from "./useAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const mutation = useLoginMutation();
  const dispatch = useDispatch();

  const [formLogin, setFormLogin] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
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
    if (errors.length > 0) setErrors([]);
  };

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formLogin.email || !formLogin.password) {
      return setErrors(["All fields are required!"]);
    }

    mutation.mutate(formLogin, {
      onSuccess: (data) => {
        localStorage.setItem("userData", JSON.stringify(data.data));

        dispatch(addToken(data.data));

        alert("Success Login!");
        dispatch(addToken(data.data));
        setFormLogin({ email: "", password: "" });
        setErrors([]);
        navigate("/");
      },
      onError: (error: any) => {
        const msg = error.response?.data?.message;
        setErrors((prev) => [...prev, msg]);
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
  };
};
