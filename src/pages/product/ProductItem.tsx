import type { Category } from "../../hooks/category/useCategory";
import type { Product, updateProduct } from "../../hooks/product/useProduct";

interface ProductItemProps {
  product: Product;
  formUpdateProduct: updateProduct;
  isShowEditButton: boolean;
  onUpdateProduct: (updatedProduct: updateProduct) => void;
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
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10 p-5">
        <div>
          <ul>
            <li>Name: {product.name}</li>
            <li>Description: {product.description}</li>
            <li>Price: Rp.{product.price}</li>
            <li>Stock: {product.stock}</li>
            <li>Category: {product.category}</li>
          </ul>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onDeleteProduct(product.id);
              }}
              className="flex text-base font-semibold text-white bg-primary mt-5 py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={() => {
                onToggleEditProduct(product.id);
              }}
              className="flex text-base font-semibold text-white bg-primary mt-5 py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={() => onProductClicked(product.id)}
              className="flex text-base font-semibold text-white bg-primary mt-5 py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
            >
              Detail
            </button>
          </div>
        </div>

        {isShowEditButton ? (
          <div className="mt-5">
            <input
              type="text"
              name="name"
              value={formUpdateProduct.name}
              onChange={handleFormEdit}
              placeholder="input name product"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />
            <textarea
              name="description"
              value={formUpdateProduct.description}
              onChange={handleFormEdit}
              placeholder="input description product"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />
            <input
              type="number"
              name="price"
              value={formUpdateProduct.price}
              onChange={handleFormEdit}
              placeholder="input price product"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />
            <input
              type="number"
              name="stock"
              value={formUpdateProduct.stock}
              onChange={handleFormEdit}
              placeholder="input stock product"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />
            <select
              name="category"
              value={formUpdateProduct.category}
              onChange={handleFormEdit}
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            >
              <option value="">Select Category</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdateProduct(formUpdateProduct)}
                className="flex text-base font-semibold text-white bg-primary mt-5 py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={() => onToggleEditProduct("")}
                className="flex text-base font-semibold text-white bg-primary mt-5 py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductItem;
