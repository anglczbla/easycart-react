import { AlertCircle } from "lucide-react";

const ErrorMessage = ({
  errors,
  message,
}: {
  errors?: string[];
  message?: string;
}) => {
  const messages = [...(errors ?? []), ...(message ? [message] : [])];

  if (messages.length === 0) return null;

  return (
    <>
      {messages.map((msg, index) => (
        <div
          key={index}
          className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-sm flex items-center gap-3"
        >
          <AlertCircle className="h-5 w-5" />
          <span className="font-semibold">{msg}</span>
        </div>
      ))}
    </>
  );
};

export default ErrorMessage;
