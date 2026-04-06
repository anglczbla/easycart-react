import { ArrowLeft, ShoppingCart, Zap } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import PriceTag from "../../components/ui/PriceTag";
import { useProductDetail } from "../../hooks/product/useProductDetail";
import { useAppSelector } from "../../hooks/useAppSelector";
import ReviewPage from "../review/ReviewPage";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, addItem, isPending, handleCheckout, stock } =
    useProductDetail(id || "");
  const admin = useAppSelector((state) => state.auth.admin);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted font-semibold animate-pulse">
            Loading Product Details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-muted hover:text-primary transition-elegant mb-8 group font-semibold"
      >
        <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square bg-white rounded-[40px] card-shadow overflow-hidden border border-gray-50 flex items-center justify-center p-12 lg:sticky lg:top-28">
          <img
            src={data?.image}
            alt={data?.name}
            className="w-full h-full object-contain hover:scale-105 transition-elegant"
          />
          {stock <= 0 && (
            <div className="absolute top-8 right-8 bg-error text-white px-6 py-2 rounded-2xl text-sm font-bold shadow-xl animate-in fade-in zoom-in duration-300">
              Out of Stock
            </div>
          )}
        </div>

        <div className="flex flex-col pt-4">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 rounded-full mb-4 border border-primary/10">
              {data?.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
              {data?.name}
            </h1>
            <div className="flex items-center gap-4">
              <PriceTag
                price={data?.price}
                className="text-3xl font-bold text-primary-light"
              />
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${stock > 0 ? "bg-success" : "bg-error"}`}
                />
                <span className="text-sm font-semibold text-muted">
                  {stock > 0 ? `${stock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-surface p-8 rounded-4xl border border-gray-100">
              <h3 className="text-xs font-bold text-primary/40 uppercase tracking-[0.2em] mb-4">
                About this item
              </h3>
              <p className="text-primary/70 leading-relaxed font-medium text-lg">
                {data?.description}
              </p>
            </div>

            {!admin ? (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  className="flex-1 py-4! rounded-2xl! shadow-lg shadow-primary/10"
                  disabled={stock <= 0 || isPending}
                  onClick={addItem}
                  isLoading={isPending}
                  name={
                    <div className="flex items-center gap-2">
                      <ShoppingCart size={20} />
                      <span>{stock <= 0 ? "Out of Stock" : "Add to Cart"}</span>
                    </div>
                  }
                />
                <Button
                  variant="secondary"
                  className="flex-1 py-4! rounded-2xl! border-2 border-primary/10"
                  onClick={handleCheckout}
                  disabled={stock <= 0}
                  name={
                    <div className="flex items-center gap-2">
                      <Zap size={20} />
                      <span>Buy Now</span>
                    </div>
                  }
                />
              </div>
            ) : (
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 text-primary font-bold text-center">
                Administrator View
              </div>
            )}
          </div>
          <ReviewPage productId={id || ""} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
