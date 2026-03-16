import { useParams } from "react-router-dom";
import { usegetAllProductsById } from "../hooks/product/useProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = usegetAllProductsById(id || "");

  return (
    <div>
      <div>
        {isLoading ? (
          "...Load Products"
        ) : (
          <ul>
            <li>
              <li>Name: {data?.name}</li>
              <li>Description: {data?.description}</li>
              <li>Price: Rp.{data?.price}</li>
              <li>Stock: {data?.stock}</li>
              <li>Category: {data?.category}</li>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
