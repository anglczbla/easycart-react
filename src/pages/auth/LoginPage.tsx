import { useLogin } from "../../hooks/auth/useLogin";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Input from "../../components/ui/Input";
import AuthLayout from "./AuthLayout";

const LoginPage = () => {
  const {
    formLogin,
    submitLogin,
    handleLogin,
    isPending,
    helperPassword,
    showPassword,
    errors,
    goToRegister,
  } = useLogin();

  return (
    <AuthLayout title="Login" subtitle="Login to Your Account">
      <ErrorMessage errors={errors.message} />
      <form
        onSubmit={submitLogin}
        className="flex flex-col gap-5 rounded-xl p-8 w-full max-w-md mx-auto"
      >
        <ErrorMessage errors={errors.email} />
        <Input
          type="email"
          name="email"
          value={formLogin.email}
          onChange={handleLogin}
          placeholder="input an email"
          errors={errors.email}
        />
        <div className="flex w-full gap-2 items-center">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formLogin.password ?? ""}
            onChange={handleLogin}
            placeholder="input a password"
            errors={errors.password}
          />
          <Button
            name={showPassword ? "Hide" : "Show"}
            type="button"
            onClick={helperPassword}
          />
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1"
            name={isPending ? "...Login" : "Login"}
          />

          <Button
            type="button"
            onClick={goToRegister}
            className="flex-1"
            name="Register"
          />
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
