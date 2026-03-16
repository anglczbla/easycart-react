import type { UpdateProduct } from "../hooks/product/useProduct";
import { usegetAllProducts } from "../hooks/product/useProduct";

interface ProductListProps {
  formEdit: UpdateProduct;
  updatedProd: (id: string, formEdit: Omit<UpdateProduct, "id">) => void;
  delProd: (id: string) => void;
  toggleEdit: (idx: number, product: UpdateProduct) => void;
  showEdit: any;
  handleFormEdit: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}
const ProductList = ({
  formEdit,
  updatedProd,
  delProd,
  toggleEdit,
  showEdit,
  handleFormEdit,
}: ProductListProps) => {
  const { data } = usegetAllProducts();

  return (
    <div>
      <div>
        {(data?.length ?? 0) <= 0 ? (
          <p>product empty</p>
        ) : (
          data?.map((prod, idx) => (
            <div key={prod.id}>
              <ul>
                <li>Name: {prod.name}</li>
                <li>Description: {prod.description}</li>
                <li>Price: Rp.{prod.price}</li>
                <li>Stock: {prod.stock}</li>
                <li>Category: {prod.category}</li>
              </ul>
              <button onClick={() => delProd(prod.id)}>Delete</button>
              <button onClick={() => toggleEdit(idx, prod)}>Edit</button>
              {showEdit === idx ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formEdit.name}
                    onChange={handleFormEdit}
                    placeholder="input name product"
                  />
                  <textarea
                    name="description"
                    value={formEdit.description}
                    onChange={handleFormEdit}
                    placeholder="input description product"
                  />
                  <input
                    type="number"
                    name="price"
                    value={formEdit.price}
                    onChange={handleFormEdit}
                    placeholder="input price product"
                  />
                  <input
                    type="number"
                    name="stock"
                    value={formEdit.stock}
                    onChange={handleFormEdit}
                    placeholder="input stock product"
                  />
                  <input
                    type="text"
                    name="category"
                    value={formEdit.category}
                    onChange={handleFormEdit}
                    placeholder="input category product"
                  />
                  <button onClick={() => updatedProd(prod.id, formEdit)}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
