import type { InputProps } from "../../types/types";
import ErrorMessage from "./ErrorMessage";

const Input = ({ label, errors, ...props }: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-primary/80 px-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full bg-white text-primary border border-gray-200 p-3 rounded-xl transition-elegant
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
          placeholder:text-muted placeholder:text-sm
          ${errors ? "border-error focus:ring-error/20 focus:border-error" : ""}
        `}
      />
      {errors && <ErrorMessage errors={errors} className="mt-1 ml-1" />}
    </div>
  );
};

export default Input;
