import { Eye, EyeOff, LogIn } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Input from "../../components/ui/Input";
import { useLogin } from "../../hooks/auth/useLogin";

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
    <AuthLayout title="Welcome Back" subtitle="Log in to access your dashboard">
      <ErrorMessage message={errors?.message?.[0]} className="mb-6" />

      <form onSubmit={submitLogin} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formLogin.email}
          onChange={handleLogin}
          placeholder="e.g. johndoe@example.com"
          errors={errors?.email}
        />

        <div className="relative group">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formLogin.password ?? ""}
            onChange={handleLogin}
            placeholder="Your secure password"
            errors={errors?.password}
          />
          <button
            type="button"
            onClick={helperPassword}
            className="absolute right-4 top-10.5 text-muted hover:text-primary transition-colors p-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            isLoading={isPending}
            className="w-full justify-center py-3.5!"
            name={
              <div className="flex items-center gap-2">
                <LogIn size={18} />
                <span>Sign In</span>
              </div>
            }
          />

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted font-medium">
                New to EasyCart?
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={goToRegister}
            className="w-full justify-center py-3.5!"
            name="Create an Account"
          />
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
