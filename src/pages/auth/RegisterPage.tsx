import { useRegister } from "../../hooks/auth/useRegister";
import AuthLayout from "./AuthLayout";
import Button from "../ui/Button";

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
