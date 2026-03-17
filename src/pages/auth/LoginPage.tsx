import { useLogin } from "../../hooks/auth/useLogin";
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

          <button
            type="button"
            onClick={helperPassword}
            className="text-base font-semibold text-secondary bg-primary py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 text-base font-semibold text-secondary bg-primary py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
          >
            {isPending ? "...Login" : "Login"}
          </button>

          <button
            type="button"
            onClick={goToRegister}
            className="flex-1 text-base font-semibold text-secondary bg-primary py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
