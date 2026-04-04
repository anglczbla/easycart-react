import { ArrowRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import PriceTag from "../components/ui/PriceTag";
import { usegetAllProducts } from "../hooks/product/useProduct";

const HomePage = () => {
  const products = usegetAllProducts();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="mb-16 rounded-[40px] bg-primary-dark p-12 lg:p-20 relative overflow-hidden card-shadow">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
            Elevate Your Style with{" "}
            <span className="text-primary-light">EasyCart</span>
          </h2>
          <p className="text-secondary/70 text-lg mb-10 font-medium">
            Discover our exclusive collection of premium products designed for
            modern living.
          </p>
          <Button
            name="Explore Collections"
            variant="secondary"
            className="!px-10 !py-4 rounded-2xl group"
            onClick={() => navigate("/products")}
          />
        </div>
      </div>

      <div className="flex justify-between items-end mb-10 px-2">
        <div>
          <h3 className="text-3xl font-bold text-primary mb-2">
            Featured Products
          </h3>
          <p className="text-muted font-medium">Top picks for you this week</p>
        </div>
        <Button
          variant="ghost"
          name={
            <div className="flex items-center gap-2 group">
              <span>View All</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          }
          onClick={() => navigate("/products")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[32px] h-[420px] animate-pulse shadow-sm border border-gray-50"
              />
            ))
          : products.data?.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-[32px] card-shadow hover:shadow-2xl transition-elegant overflow-hidden flex flex-col border border-gray-100/50"
              >
                <div
                  className="relative h-64 bg-surface/50 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-elegant"
                  />
                  <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-elegant">
                    <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-2xl shadow-xl text-primary">
                      <ShoppingBag size={20} />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col grow">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-primary line-clamp-1 mb-1 group-hover:text-primary-light transition-colors">
                      {item.name}
                    </h3>
                    <PriceTag
                      price={item.price}
                      className="text-xl font-bold text-primary-light"
                    />
                  </div>

                  <p className="text-muted text-sm line-clamp-2 mb-8 grow font-medium leading-relaxed">
                    {item.description}
                  </p>

                  <Button
                    name="View Product"
                    variant="primary"
                    className="w-full !rounded-2xl !py-3 font-bold shadow-sm"
                    onClick={() => navigate(`/products/${item.id}`)}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default HomePage;
