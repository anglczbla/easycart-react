const DateDisplay = ({ date }: any) => {
  return (
    <div className="text-sm text-gray-600 line-clamp-1">
      {new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </div>
  );
};

export default DateDisplay;
