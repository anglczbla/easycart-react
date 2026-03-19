import { useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/product/useProductDetail";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, addItem } = useProductDetail(id || "");

  return (
    <div>
      <div>
        {isLoading ? (
          <p className="italic font-base text-xl">"...Load Products"</p>
        ) : (
          <div className="w-full p-5">
            <ul className="bg-white rounded-xl shadow-lg overflow-hidden mb-10 p-5">
              <li>Name: {data?.name}</li>
              <li>Description: {data?.description}</li>
              <li>Price: Rp.{data?.price}</li>
              <li>Stock: {data?.stock}</li>

              <button
                className="flex-1 text-base font-semibold text-secondary bg-primary py-3 px-8 mt-3 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
                disabled={(data?.stock ?? 0) <= 0}
                onClick={addItem}
              >
                {(data?.stock ?? 0) <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
