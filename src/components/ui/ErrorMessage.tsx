import { AlertCircle } from "lucide-react";

const ErrorMessage = ({
  errors,
  message,
  className = "",
}: {
  errors?: string[];
  message?: string;
  className?: string;
}) => {
  const messages = [...(errors ?? []), ...(message ? [message] : [])];

  if (messages.length === 0) return null;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-error animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="text-xs font-medium leading-tight">{msg}</span>
        </div>
      ))}
    </div>
  );
};

export default ErrorMessage;
