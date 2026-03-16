import { usegetAllProducts } from "../hooks/product/useProduct";
import { useProductForm } from "../hooks/product/useProductForm";
const ProductList = () => {
  const { data } = usegetAllProducts();
  const {
    formEdit,
    updatedProd,
    delProd,
    toggleEdit,
    showEdit,
    handleFormEdit,
  } = useProductForm();
  return (
    <div>
      <div>
        {(data?.length ?? 0) <= 0 ? (
          <p>product empty</p>
        ) : (
          data?.map((prod) => (
            <div key={prod.name}>
              <ul>
                <li>Name: {prod.name}</li>
                <li>Description: {prod.description}</li>
                <li>Price: Rp.{prod.price}</li>
                <li>Stock: {prod.stock}</li>
                <li>Category: {prod.category}</li>
              </ul>
              <button onClick={() => delProd(prod.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
