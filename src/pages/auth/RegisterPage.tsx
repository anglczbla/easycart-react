import { useRegister } from "../../hooks/auth/useRegister";
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
        className="flex flex-col gap-5rounded-xl p-8 w-full max-w-md mx-auto"
      >
        {errors.length > 0 && (
          <div className="font-bold text-red-500 text-center">
            {errors.map((msg, index) => (
              <p key={index}> {msg}</p>
            ))}
          </div>
        )}
        <input
          type="text"
          name="username"
          value={formRegist.username}
          onChange={handleRegist}
          placeholder="input a username"
          className="w-full border border-primary p-2 rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
        />
        <input
          type="email"
          name="email"
          value={formRegist.email}
          onChange={handleRegist}
          placeholder="input an email"
          className="w-full border border-primary p-2 rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
        />
        <div className="flex w-full gap-2 items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formRegist.password}
            onChange={handleRegist}
            placeholder="input a password"
            className="w-full border border-primary p-2 rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
          />

          <button
            type="button"
            onClick={helperPassword}
            className="text-base font-semibold text-secondary bg-primary py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 text-base font-semibold text-secondary bg-primary py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
          >
            {isPending ? "...Registering" : "Register"}
          </button>
          <button
            type="button"
            onClick={goToLogin}
            className="flex-1 text-base font-semibold text-secondary bg-primary py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
