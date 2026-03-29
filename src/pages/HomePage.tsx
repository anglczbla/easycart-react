import { useNavigate } from "react-router-dom";
import { usegetAllProducts } from "../hooks/product/useProduct";
import Button from "./ui/Button";

const HomePage = () => {
  const products = usegetAllProducts();
  const navigate = useNavigate();

  console.log(products.data);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          {products.data?.map((item) => (
            <div
              key={item.id}
              className="w-full p-2 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <ul>
                <li>
                  <img
                    src={item.image}
                    alt={item.image}
                    className="object-cover"
                  />
                </li>
                <div className="flex justify-between">
                  <li className="text center font-bold">{item.name}</li>
                  <li>Rp.{item.price}</li>
                </div>
                <li>{item.description}</li>
                <Button
                  name="See Detail"
                  onClick={() => navigate(`/products/${item.id}`)}
                />
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
