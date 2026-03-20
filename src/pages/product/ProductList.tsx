import type { Category } from "../../hooks/category/useCategory";
import type { Product, updateProduct } from "../../hooks/product/useProduct";
import ProductItem from "./ProductItem";

interface ProductListProps {
  formEdit: updateProduct;
  updatedProd: (updatedProduct: Product) => void;
  delProd: (id: string) => void;
  toggleEdit: (id: string) => void;
  showEdit: any;
  handleFormEdit: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  detailProd: (id: string) => void;
  data: Product[];
  filterSearch: Product[];
  categories: Category[] | undefined;
  inputValue: string;
  categoryValue: string;
  handleSearch: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;

  handleCategory: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  isLoadingSearch?: boolean;
}

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
}: ProductListProps) => {
  return (
    <div>
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            name="searching"
            value={inputValue}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
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
      <div className="flex flex-wrap">
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

        {!isLoadingSearch &&
          filterSearch.map((prod) => (
            <div className="w-full mt-5 px-4 md:w-1/2 lg:w-1/3" key={prod.id}>
              <ProductItem
                product={prod}
                isShowEditButton={prod.id == showEdit}
                formUpdateProduct={formEdit}
                handleFormEdit={handleFormEdit}
                onToggleEditProduct={toggleEdit}
                onProductClicked={detailProd}
                onDeleteProduct={delProd}
                onUpdateProduct={updatedProd}
                categories={categories}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
