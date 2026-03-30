interface PriceTagProps {
  price: string | number | undefined;
  className?: string;
}

const PriceTag = ({ price, className = "" }: PriceTagProps) => {
  const formatPrice = (value: string | number | undefined) => {
    if (value === undefined || value === null) return "Rp 0";
    
    const numericPrice = typeof value === "string" ? Number(value) : value;
    
    if (isNaN(numericPrice)) return "Rp 0";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numericPrice);
  };

  return <span className={`font-bold text-primary ${className}`}>{formatPrice(price)}</span>;
};

export default PriceTag;
