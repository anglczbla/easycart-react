import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useDeleteModal } from "../../hooks/delete/useDeleteModal";
import { useProductForm } from "../../hooks/product/useProductForm";
import type { ProductItemProps } from "../../types/types";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import PriceTag from "../ui/PriceTag";
import ProductEditForm from "./ProductEditForm";

const ProductItem = ({ product, admin, categories }: ProductItemProps) => {
  const { handleDeleteProduct, goToDetail } = useProductForm();
  const { isOpen, selectedId, handleOpen, handleClose } = useDeleteModal();
  const [isEditing, setIsEditing] = useState(false);

  if (admin) {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden p-5 hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 group">
        <div className="flex-1 flex flex-col">
          <div className="w-full h-48 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2 group-hover:bg-gray-100 transition-colors duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex justify-between mt-5 gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="shrink-0 flex items-start">
              <PriceTag price={product.price} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-auto pt-4">
          <div className="flex gap-2">
            <Button
              onClick={() => handleOpen(product.id)}
              name="Delete"
              variant="danger"
              className="flex-1 text-sm rounded-xl py-2!"
            />
            <Button
              onClick={() => setIsEditing(true)}
              className="flex-1 text-sm rounded-xl py-2!"
              variant="secondary"
              name="Edit"
            />
          </div>
          <Button
            onClick={() => goToDetail(product.id)}
            className="w-full text-center rounded-xl text-sm py-2!"
            name="View Detail"
          />
        </div>

        <Modal
          open={isOpen}
          handleClose={handleClose}
          title="Delete Product?"
          content="Are you sure want delete this Product?"
          onConfirm={() => {
            handleDeleteProduct(selectedId);
            handleClose();
          }}
        />

        {isEditing && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <ProductEditForm
              product={product}
              categories={categories}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-4xl card-shadow hover:shadow-2xl transition-elegant overflow-hidden flex flex-col border border-gray-100/50">
      <div
        className="relative h-64 bg-surface/50 overflow-hidden cursor-pointer"
        onClick={() => goToDetail(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-8 group-hover:scale-110 transition-elegant"
        />
        <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-elegant">
          <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-2xl shadow-xl text-primary">
            <ShoppingBag size={20} />
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-primary line-clamp-1 mb-1 group-hover:text-primary-light transition-colors">
            {product.name}
          </h3>
          <PriceTag
            price={product.price}
            className="text-xl font-bold text-primary-light"
          />
        </div>

        <p className="text-muted text-sm line-clamp-2 mb-8 grow font-medium leading-relaxed">
          {product.description}
        </p>

        <Button
          onClick={() => goToDetail(product.id)}
          name="View Product"
          variant="primary"
          className="w-full rounded-2xl py-3! font-bold shadow-sm mt-auto"
        />
      </div>
    </div>
  );
};

export default ProductItem;
