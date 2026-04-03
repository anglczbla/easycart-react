import React from "react";
import type { Product, Category } from "../../types/types";
import { useProductForm } from "../../hooks/product/useProductForm";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

interface ProductEditFormProps {
  product: Product;
  categories?: Category[];
  onCancel: () => void;
}

const ProductEditForm = ({
  product,
  categories,
  onCancel,
}: ProductEditFormProps) => {
  const {
    formEdit,
    handleFormEdit,
    handleImageEdit,
    submitUpdate,
    isPendingUpdate,
    errorsUpdate,
  } = useProductForm(product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitUpdate(onCancel);
  };

  return (
    <div className="mt-5 border-t pt-5">
      <h3 className="font-bold mb-3">Edit Product</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          name="name"
          value={formEdit.name}
          onChange={handleFormEdit}
          placeholder="Product Name"
          errors={errorsUpdate?.name}
        />
        <textarea
          name="description"
          value={formEdit.description}
          onChange={handleFormEdit}
          placeholder="Description"
          className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
        />
        <div className="flex gap-2">
          <Input
            type="number"
            name="price"
            value={formEdit.price}
            onChange={handleFormEdit}
            placeholder="Price"
            errors={errorsUpdate?.price}
          />
          <Input
            type="number"
            name="stock"
            value={formEdit.stock}
            onChange={handleFormEdit}
            placeholder="Stock"
            errors={errorsUpdate?.stock}
          />
        </div>
        <select
          name="category"
          value={formEdit.category}
          onChange={handleFormEdit}
          className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
        >
          <option value="">Select Category</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <input type="file" accept="image/*" onChange={handleImageEdit} />
        <div className="flex gap-2 mt-3">
          <Button
            type="submit"
            className="w-full"
            name={isPendingUpdate ? "Updating..." : "Update"}
            disabled={isPendingUpdate}
          />
          <Button
            onClick={onCancel}
            className="w-full bg-red-600"
            name="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default ProductEditForm;
