import type { Category } from "../../hooks/category/useCategory";
import type { Products } from "../../hooks/product/useProduct";
import ProductItem from "./ProductItem";

interface ProductListProps {
  formEdit: Products;
  updatedProd: (updatedProduct: Products) => void;
  delProd: (id: string) => void;
  toggleEdit: (id: string) => void;
  showEdit: any;
  handleFormEdit: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  detailProd: (id: string) => void;
  data: Products[];
  filterSearch: Products[];
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
    <div>
      <div>
        {(data?.length ?? 0) <= 0 ? (
          <p>product empty</p>
        ) : filterSearch?.length <= 0 ? (
          <p>product not found</p>
        ) : (
          filterSearch?.map((prod) => (
            <ProductItem
              key={prod.id}
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
