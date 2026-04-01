import type { ProductListProps } from "../../types/types";
import Input from "../ui/Input";
import ProductItem from "./ProductItem";

const ProductList = ({
  formEdit,
  updatedProd,
  delProd,
  toggleEdit,
  showEdit,
  handleFormEdit,
  detailProd,
  data,
  filterSearch,
  categories,
  inputValue,
  handleSearch,
  handleCategory,
  categoryValue,
  isLoadingSearch,
  admin,
  handleEditImage,
}: ProductListProps) => {
  return (
    <div>
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <Input
            type="text"
            name="searching"
            value={inputValue}
            onChange={handleSearch}
            placeholder="Search products..."
          />
        </div>
        <div className="w-1/3">
          <select
            name="category"
            value={categoryValue}
            onChange={handleCategory}
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

      {isLoadingSearch && (
        <p className="w-full text-center mt-10">searching products...</p>
      )}

      {!isLoadingSearch && data.length === 0 && (
        <p className="w-full text-center mt-10">product empty</p>
      )}

      {!isLoadingSearch &&
        data.length > 0 &&
        (inputValue !== "" || categoryValue !== "") &&
        filterSearch.length === 0 && (
          <p className="w-full text-center mt-10">product not found</p>
        )}

      {!isLoadingSearch && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-8">
            {filterSearch.map((prod) => (
              <ProductItem
                key={prod.id}
                admin={admin}
                product={prod}
                isShowEditButton={prod.id === showEdit}
                formUpdateProduct={formEdit}
                handleFormEdit={handleFormEdit}
                onToggleEditProduct={toggleEdit}
                onProductClicked={detailProd}
                onDeleteProduct={delProd}
                onUpdateProduct={updatedProd}
                categories={categories}
                handleEditImage={handleEditImage}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
