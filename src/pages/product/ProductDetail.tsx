import { useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/product/useProductDetail";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, addItem } = useProductDetail(id || "");

  return (
    <div>
      <div>
        {isLoading ? (
          "...Load Products"
        ) : (
          <div>
            <ul>
              <li>Name: {data?.name}</li>
              <li>Description: {data?.description}</li>
              <li>Price: Rp.{data?.price}</li>
              <li>Stock: {data?.stock}</li>
            </ul>
            <button disabled={(data?.stock ?? 0) <= 0} onClick={addItem}>
              {(data?.stock ?? 0) <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
