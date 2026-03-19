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
}: ProductListProps) => {
  return (
    <div className="flex flex-wrap">
      {(data?.length ?? 0) <= 0 ? (
        <p>product empty</p>
      ) : filterSearch?.length <= 0 ? (
        <p>product not found</p>
      ) : (
        filterSearch?.map((prod) => (
          <div className="w-full px-4 md:w-1/2 lg:w-1/3" key={prod.id}>
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
        ))
      )}
    </div>
  );
};

export default ProductList;
