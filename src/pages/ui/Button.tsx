import type { ButtonProps } from "../../types/types";

const Button = ({
  name,
  type = "button",
  onClick,
  disabled,
  className = "",
}: ButtonProps) => {
  return (
    <button
      className={`text-base font-semibold text-secondary bg-primary py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
