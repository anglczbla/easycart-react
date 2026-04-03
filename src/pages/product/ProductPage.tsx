import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Input from "../../components/ui/Input";
import { useProductForm } from "../../hooks/product/useProductForm";
import { useAppSelector } from "../../hooks/useAppSelector";
import ProductList from "./ProductList";

const ProductPage = () => {
  const admin = useAppSelector((state) => state.auth.admin);
  const {
    categories,
    isLoading,
    formAdd,
    handleFormAdd,
    handleImageAdd,
    submitAdd,
    isPendingAdd,
    errorsAdd,
    displayProducts,
  } = useProductForm();

  if (isLoading && !displayProducts.length)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto">
      {admin && (
        <div className="mb-10">
          <div className="max-w-xl mx-auto text-center mb-8">
            <h4 className="font-semibold text-lg text-primary">Form Product</h4>
            <p className="font-medium text-md text-primary">
              Create New Product
            </p>
          </div>

          <ErrorMessage errors={errorsAdd?.message} />

          <div className="w-full lg:w-2/3 mx-auto px-4">
            <form onSubmit={submitAdd} className="space-y-4">
              <Input
                type="text"
                name="name"
                value={formAdd.name}
                onChange={handleFormAdd}
                placeholder="Product Name"
                errors={errorsAdd?.name}
              />
              <textarea
                name="description"
                value={formAdd.description}
                onChange={handleFormAdd}
                placeholder="Description"
                className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
              />
              <div className="flex gap-4">
                <Input
                  type="number"
                  name="price"
                  value={formAdd.price}
                  onChange={handleFormAdd}
                  placeholder="Price"
                  errors={errorsAdd?.price}
                />
                <Input
                  type="number"
                  name="stock"
                  value={formAdd.stock}
                  onChange={handleFormAdd}
                  placeholder="Stock"
                  errors={errorsAdd?.stock}
                />
              </div>

              <select
                name="category"
                value={formAdd.category}
                onChange={handleFormAdd}
                className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
              >
                <option value="">Select Category</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input type="file" onChange={handleImageAdd} />
              <Button
                type="submit"
                className="w-full mt-4"
                name={isPendingAdd ? "...Adding Product" : "Add Product"}
                disabled={isPendingAdd}
              />
            </form>
          </div>
        </div>
      )}

      <ProductList products={displayProducts} admin={admin} />
    </div>
  );
};

export default ProductPage;
