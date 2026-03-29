import { useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/product/useProductDetail";
import Button from "../ui/Button";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, addItem } = useProductDetail(id || "");

  const stock = Number(data?.stock);

  return (
    <div>
      <div>
        {isLoading ? (
          <p className="italic font-base text-xl">"...Load Products"</p>
        ) : (
          <div className="w-full p-5">
            <ul className="w-fullbg-white rounded-xl shadow-lg overflow-hidden mb-10 p-5">
              <li>
                {" "}
                <img
                  src={data?.image}
                  alt={data?.image}
                  className="object-cover"
                />
              </li>
              <li>Name: {data?.name}</li>
              <li>Description: {data?.description}</li>
              <li>Price: Rp.{data?.price}</li>
              <li>Stock: {data?.stock}</li>

              <Button
                className="flex-1 mt-3"
                disabled={(stock ?? 0) <= 0}
                onClick={addItem}
                name={(stock ?? 0) <= 0 ? "Out of Stock" : "Add to Cart"}
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
