import { useNavigate } from "react-router-dom";
import { usegetAllProducts } from "../hooks/product/useProduct";
import Button from "./ui/Button";
import PriceTag from "./ui/PriceTag";

const HomePage = () => {
  const products = usegetAllProducts();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.data?.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
          >
            <div className="relative h-56 bg-gray-50 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain p-4 0 group-hover:scale-105 "
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1 flex-1 pr-2">
                  {item.name}
                </h3>
                <PriceTag
                  price={item.price}
                  className="text-lg whitespace-nowrap"
                />
              </div>

              <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
                {item.description}
              </p>

              <Button
                name="View Details"
                className="w-full !py-2.5 rounded-xl text-sm"
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
