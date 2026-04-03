import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import PriceTag from "../../components/ui/PriceTag";
import { useProductDetail } from "../../hooks/product/useProductDetail";
import { useAppSelector } from "../../hooks/useAppSelector";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, addItem, isPending, handleCheckout, stock } =
    useProductDetail(id || "");
  const admin = useAppSelector((state) => state.auth.admin);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">
            Loading Product Details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary transition-colors mb-6 group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-100 md:h-auto bg-gray-50">
          <img
            src={data?.image}
            alt={data?.name}
            className="absolute inset-0 w-full h-full object-contain p-8"
          />
          {stock <= 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
              Out of Stock
            </div>
          )}
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full mb-2">
              {data?.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {data?.name}
            </h1>
            <PriceTag price={data?.price} className="text-2xl" />
          </div>

          <div className="border-t border-b border-gray-100 py-6 mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">{data?.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-semibold mr-2">Stock available:</span>
              <span
                className={`${stock > 0 ? "text-green-600" : "text-red-600"} font-medium`}
              >
                {stock} items
              </span>
            </div>

            {!admin ? (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="flex-1"
                  disabled={stock <= 0 || isPending}
                  onClick={addItem}
                  name={
                    isPending
                      ? "Adding..."
                      : stock <= 0
                        ? "Out of Stock"
                        : "Add to Cart"
                  }
                />
                <Button
                  className="flex-1 bg-white text-primary! border-2 border-primary hover:bg-primary/5 shadow-none"
                  onClick={handleCheckout}
                  name="Buy Now"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
