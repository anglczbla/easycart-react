const ErrorMessage = ({ errors }: { errors?: string[] }) => {
  if (!errors) return null;
  return (
    <>
      {errors.map((err, index) => (
        <p key={index} className="text-red-500 text-sm text-center font-bold">
          {err}
        </p>
      ))}
    </>
  );
};

export default ErrorMessage;
