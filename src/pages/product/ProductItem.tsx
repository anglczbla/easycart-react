import { useDeleteModal } from "../../hooks/delete/useDeleteModal";
import type { ProductItemProps } from "../../types/types";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import PriceTag from "../../components/ui/PriceTag";

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
  const { isOpen, selectedId, handleOpen, handleClose } = useDeleteModal();
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden p-5 hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 group">
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex justify-between mt-5">
          <div className="flex-1 mr-4">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>
          <div>
            <PriceTag price={product.price} />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-auto pt-4">
        {admin && (
          <>
            <Button onClick={() => handleOpen(product.id)} name="Delete" />

            <Modal
              open={isOpen}
              handleClose={handleClose}
              title="Delete Product?"
              content="Are you sure want delete this Product?"
              onConfirm={() => {
                onDeleteProduct(selectedId);
                handleClose();
              }}
            />
          </>
        )}
        {admin && (
          <Button
            onClick={() => onToggleEditProduct(product.id)}
            className="w-full"
            name="Edit"
          />
        )}
        <Button
          onClick={() => onProductClicked(product.id)}
          className="w-full text-center rounded-xl text-sm"
          name="View Detail"
        />
      </div>

      {isShowEditButton && (
        <div className="mt-5 border-t pt-5">
          <h3 className="font-bold mb-3">Edit Product</h3>
          <Input
            type="text"
            name="name"
            value={formUpdateProduct.name}
            onChange={handleFormEdit}
            placeholder="Product Name"
          />
          <textarea
            name="description"
            value={formUpdateProduct.description}
            onChange={handleFormEdit}
            placeholder="Description"
            className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
          />
          <Input
            type="number"
            name="price"
            value={formUpdateProduct.price}
            onChange={handleFormEdit}
            placeholder="Price"
          />
          <Input
            type="number"
            name="stock"
            value={formUpdateProduct.stock}
            onChange={handleFormEdit}
            placeholder="Stock"
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
            accept="image/*"
            onChange={handleEditImage}
            className="mb-2"
          />
          <div className="flex gap-2 mt-3">
            <Button
              onClick={() => onUpdateProduct(formUpdateProduct)}
              className="w-full"
              name="Update"
            />
            <Button
              onClick={() => onToggleEditProduct("")}
              className="w-full bg-red-600"
              name="Cancel"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
