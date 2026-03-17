import type { Category } from "../../hooks/category/useCategory";
import type { Products } from "../../hooks/product/useProduct";

interface ProductItemProps {
  product: Products;
  formUpdateProduct: Products;
  isShowEditButton: boolean;
  onUpdateProduct: (updatedProduct: Products) => void;
  onDeleteProduct: (id: string) => void;
  onToggleEditProduct: (id: string) => void;
  handleFormEdit: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onProductClicked: (id: string) => void;
  categories: Category[] | undefined;
}
const ProductItem = ({
  product,
  isShowEditButton,
  formUpdateProduct,
  handleFormEdit,
  onToggleEditProduct,
  onProductClicked,
  onDeleteProduct,
  onUpdateProduct,
  categories,
}: ProductItemProps) => {
  return (
    <div>
      <div onClick={() => onProductClicked(product.id)}>
        Detail Product
        <ul>
          <li>Name: {product.name}</li>
          <li>Description: {product.description}</li>
          <li>Price: Rp.{product.price}</li>
          <li>Stock: {product.stock}</li>
        </ul>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteProduct(product.id);
          }}
        >
          Delete
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleEditProduct(product.id);
          }}
        >
          Edit
        </button>
      </div>

      {isShowEditButton ? (
        <div>
          <input
            type="text"
            name="name"
            value={formUpdateProduct.name}
            onChange={handleFormEdit}
            placeholder="input name product"
          />
          <textarea
            name="description"
            value={formUpdateProduct.description}
            onChange={handleFormEdit}
            placeholder="input description product"
          />
          <input
            type="number"
            name="price"
            value={formUpdateProduct.price}
            onChange={handleFormEdit}
            placeholder="input price product"
          />
          <input
            type="number"
            name="stock"
            value={formUpdateProduct.stock}
            onChange={handleFormEdit}
            placeholder="input stock product"
          />
          <select
            name="categoryId"
            value={formUpdateProduct.categoryId}
            onChange={handleFormEdit}
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button onClick={() => onUpdateProduct(formUpdateProduct)}>
            Update
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductItem;
