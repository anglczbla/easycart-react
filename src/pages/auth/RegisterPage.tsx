import { useRegister } from "../../hooks/auth/useRegister";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Input from "../../components/ui/Input";
import AuthLayout from "./AuthLayout";

const RegisterPage = () => {
  const {
    formRegist,
    submitRegister,
    handleRegist,
    isPending,
    helperPassword,
    showPassword,
    errors,
    goToLogin,
  } = useRegister();

  return (
    <AuthLayout title="Register" subtitle="Create Your Account">
      <form
        onSubmit={submitRegister}
        className="flex flex-col gap-5 rounded-xl p-8 w-full max-w-md mx-auto"
      >
        <ErrorMessage errors={errors?.message} />

        <Input
          type="text"
          name="username"
          value={formRegist.username}
          onChange={handleRegist}
          placeholder="input a username"
          errors={errors.username}
        />

        <Input
          type="email"
          name="email"
          value={formRegist.email}
          onChange={handleRegist}
          placeholder="input an email"
          errors={errors.email}
        />

        <div className="flex w-full gap-2 items-center">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formRegist.password ?? ""}
            onChange={handleRegist}
            placeholder="input a password"
            errors={errors.password}
          />

          <Button
            type="button"
            onClick={helperPassword}
            name={showPassword ? "Hide" : "Show"}
          />
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1"
            name={isPending ? "...Registering" : "Register"}
          />
          <Button
            type="button"
            onClick={goToLogin}
            className="flex-1"
            name="Login"
          />
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
