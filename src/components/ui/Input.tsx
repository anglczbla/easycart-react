import type { InputProps } from "../../types/types";
import ErrorMessage from "./ErrorMessage";

const Input = ({ errors, ...props }: InputProps) => {
  return (
    <div className="w-full mb-2">
      <input
        {...props}
        className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1"
      />
      {errors && <ErrorMessage errors={errors} />}
    </div>
  );
};

export default Input;
