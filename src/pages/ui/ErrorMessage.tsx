import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ errors }: { errors?: string[] }) => {
  if (!errors) return null;
  return (
    <>
      {errors.map((err, index) => (
        <div
          key={index}
          className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-sm flex items-center gap-3"
        >
          <AlertCircle className="h-5 w-5" />
          <span className="font-semibold">{err}</span>
        </div>
      ))}
    </>
  );
};

export default ErrorMessage;
