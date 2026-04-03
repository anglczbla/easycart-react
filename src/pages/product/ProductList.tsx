import Input from "../../components/ui/Input";
import { useProductForm } from "../../hooks/product/useProductForm";
import type { ProductListProps } from "../../types/types";
import ProductItem from "./ProductItem";

const ProductList = ({ products, admin }: ProductListProps) => {
  const { categories, search } = useProductForm();

  return (
    <div>
      <div className="flex gap-4 mb-8 px-4 lg:px-0">
        <div className="flex-1">
          <Input
            type="text"
            name="searching"
            value={search.inputValue}
            onChange={(e) => search.updateSearch(e.target.value)}
            placeholder="Search products..."
          />
        </div>
        <div className="w-1/3">
          <select
            name="category"
            value={search.categoryValue}
            onChange={(e) => search.updateCategory(e.target.value)}
            className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
          >
            <option value="">All Categories</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {search.isLoading && (
        <p className="w-full text-center mt-10">Searching products...</p>
      )}

      {!search.isLoading && products.length === 0 && (
        <p className="w-full text-center mt-10">Product not found</p>
      )}

      {!search.isLoading && (
        <div className="max-w-7xl mx-auto py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-8">
            {products.map((prod) => (
              <ProductItem
                key={prod.id}
                admin={admin ?? false}
                product={prod}
                categories={categories}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
