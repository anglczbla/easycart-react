import { Eye, EyeOff, UserPlus } from "lucide-react";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Input from "../../components/ui/Input";
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
    <AuthLayout title="Create Account" subtitle="Join our community of shoppers">
      <ErrorMessage message={errors?.message?.[0]} className="mb-6" />

      <form onSubmit={submitRegister} className="space-y-5">
        <Input
          label="Username"
          type="text"
          name="username"
          value={formRegist.username}
          onChange={handleRegist}
          placeholder="e.g. johndoe"
          errors={errors.username}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formRegist.email}
          onChange={handleRegist}
          placeholder="e.g. johndoe@example.com"
          errors={errors.email}
        />

        <div className="relative group">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formRegist.password ?? ""}
            onChange={handleRegist}
            placeholder="Choose a strong password"
            errors={errors.password}
          />
          <button
            type="button"
            onClick={helperPassword}
            className="absolute right-4 top-[42px] text-muted hover:text-primary transition-colors p-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            type="submit"
            isLoading={isPending}
            className="w-full justify-center !py-3.5 shadow-md"
            name={
              <div className="flex items-center gap-2">
                <UserPlus size={18} />
                <span>Create Account</span>
              </div>
            }
          />

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted font-medium">Already have an account?</span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={goToLogin}
            className="w-full justify-center !py-3.5"
            name="Sign In instead"
          />
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
