import { useParams } from "react-router-dom";
import { usegetAllProductsById } from "../hooks/product/useProduct";
import ProductList from "./ProductList";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = usegetAllProductsById(id || "");
  return (
    <div>
      <div>
        {isLoading
          ? "...Load Products"
          : data?.map((item) => (
              <div key={item.id}>
                <ProductList data={data} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductDetail;
