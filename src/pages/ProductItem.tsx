import type { Products } from "../hooks/product/useProduct";

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
}: ProductItemProps) => {
  return (
    <div>
      <div onClick={() => onProductClicked(product.id)}>
        <ul>
          <li>Name: {product.name}</li>
          <li>Description: {product.description}</li>
          <li>Price: Rp.{product.price}</li>
          <li>Stock: {product.stock}</li>
          <li>Category: {product.category}</li>
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
          <input
            type="text"
            name="category"
            value={formUpdateProduct.category}
            onChange={handleFormEdit}
            placeholder="input category product"
          />
          <button onClick={() => onUpdateProduct(formUpdateProduct)}>
            Update
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductItem;
