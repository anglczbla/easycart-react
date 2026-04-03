import React, { useState } from "react";
import { useDeleteModal } from "../../hooks/delete/useDeleteModal";
import { useProductForm } from "../../hooks/product/useProductForm";
import type { Product, Category } from "../../types/types";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import PriceTag from "../../components/ui/PriceTag";
import ProductEditForm from "./ProductEditForm";

interface ProductItemProps {
  product: Product;
  admin?: boolean;
  categories?: Category[];
}

const ProductItem = ({ product, admin, categories }: ProductItemProps) => {
  const { handleDeleteProduct, goToDetail } = useProductForm();
  const { isOpen, selectedId, handleOpen, handleClose } = useDeleteModal();
  const [isEditing, setIsEditing] = useState(false);

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
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full"
              name="Edit"
            />
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
          </>
        )}
        <Button
          onClick={() => goToDetail(product.id)}
          className="w-full text-center rounded-xl text-sm"
          name="View Detail"
        />
      </div>

      {isEditing && (
        <ProductEditForm
          product={product}
          categories={categories}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ProductItem;
