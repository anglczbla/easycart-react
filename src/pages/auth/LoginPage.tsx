import { useLogin } from "../../hooks/auth/useLogin";
import Button from "../ui/Button";
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
      <form
        onSubmit={submitLogin}
        className="flex flex-col gap-5 rounded-xl p-8 w-full max-w-md mx-auto"
      >
        {errors.length > 0 && (
          <div className="font-bold text-red-500 text-center">
            {errors.map((msg, index) => (
              <p key={index}> {msg}</p>
            ))}
          </div>
        )}
        <input
          type="email"
          name="email"
          value={formLogin.email}
          onChange={handleLogin}
          placeholder="input an email"
          className="w-full border border-primary p-2 rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
        />
        <div className="flex w-full gap-2 items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formLogin.password}
            onChange={handleLogin}
            placeholder="input a password"
            className="w-full border border-primary p-2 rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
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
