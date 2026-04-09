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
        {!admin && (
          <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-elegant">
            <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-2xl shadow-xl text-primary">
              <ShoppingBag size={20} />
            </div>
          </div>
        )}
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

        <div className="flex flex-col gap-3 mt-auto">
          {admin && (
            <div className="flex gap-3">
              <Button
                onClick={() => handleOpen(product.id)}
                name="Delete"
                variant="danger"
                className="flex-1 rounded-2xl font-bold shadow-sm"
              />
              <Button
                onClick={() => setIsEditing(true)}
                name="Edit"
                variant="secondary"
                className="flex-1 rounded-2xl font-bold shadow-sm"
              />
            </div>
          )}
          <Button
            onClick={() => goToDetail(product.id)}
            name={admin ? "View Detail" : "View Product"}
            variant="primary"
            className="w-full rounded-2xl py-3! font-bold shadow-sm"
          />
        </div>

        {admin && (
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
        )}
      </div>

      {isEditing && (
        <div className="p-6 border-t border-gray-100">
          <ProductEditForm
            product={product}
            categories={categories}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductItem;
