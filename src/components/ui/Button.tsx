import type { ButtonProps } from "../../types/types";
import { Loader2 } from "lucide-react";

const Button = ({
  name,
  type = "button",
  onClick,
  disabled,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-elegant cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary text-secondary hover:bg-primary-light hover:shadow-lg focus:ring-primary",
    secondary:
      "bg-surface text-primary border border-primary/10 hover:bg-gray-100 focus:ring-gray-200",
    outline:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-secondary focus:ring-primary",
    ghost: "bg-transparent text-primary hover:bg-primary/5 focus:ring-primary/10",
    danger: "bg-error text-white hover:opacity-90 focus:ring-error",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-10 py-3.5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {name}
    </button>
  );
};

export default Button;
