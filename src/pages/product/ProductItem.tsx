import type { Category, Product, ProductForm } from "../../types/types";
import Button from "../ui/Button";
import PriceTag from "../ui/PriceTag";

interface ProductItemProps {
  product: Product;
  admin: boolean;
  formUpdateProduct: ProductForm;
  isShowEditButton: boolean;
  onUpdateProduct: (updatedProduct: ProductForm) => void;
  onDeleteProduct: (id: string) => void;
  onToggleEditProduct: (id: string) => void;
  handleFormEdit: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onProductClicked: (id: string) => void;
  categories: Category[] | undefined;
  handleEditImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  admin,
  handleEditImage,
}: ProductItemProps) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden mb-10 p-5 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100">
      <div>
        <div>
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg  transition-transform duration-50 group-hover:scale-105"
            />
          </div>
          <div className="flex justify-between">
            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="mt-5">
              <p>
                <PriceTag price={product.price} />
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {admin && (
            <Button
              onClick={() => onDeleteProduct(product.id)}
              className="flex mt-5 "
              name="Delete"
            />
          )}

          {admin && (
            <Button
              onClick={() => onToggleEditProduct(product.id)}
              className="flex mt-5 "
              name="Edit"
            />
          )}

          <Button
            onClick={() => onProductClicked(product.id)}
            className="w-full text-center mt-5 rounded-xl text-sm"
            name="View Detail"
          />
        </div>
      </div>

      {isShowEditButton && (
        <div className="mt-5 border-t pt-5">
          <h3 className="font-bold mb-3">Edit Product</h3>
          <input
            type="text"
            name="name"
            value={formUpdateProduct.name}
            onChange={handleFormEdit}
            placeholder="Product Name"
            className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
          />
          <textarea
            name="description"
            value={formUpdateProduct.description}
            onChange={handleFormEdit}
            placeholder="Description"
            className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
          />
          <input
            type="number"
            name="price"
            value={formUpdateProduct.price}
            onChange={handleFormEdit}
            placeholder="Price"
            className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
          />
          <input
            type="number"
            name="stock"
            value={formUpdateProduct.stock}
            onChange={handleFormEdit}
            placeholder="Stock"
            className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
          />
          <select
            name="category"
            value={formUpdateProduct.category}
            onChange={handleFormEdit}
            className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            placeholder="select image"
            onChange={handleEditImage}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => onUpdateProduct(formUpdateProduct)}
              className="flex mt-5 "
              name="Update"
            />
            <Button
              onClick={() => onToggleEditProduct("")}
              className="flex mt-5 "
              name="Cancel"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
