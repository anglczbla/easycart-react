import { usegetAllCategories } from "../../hooks/category/useCategory";
import { useProductForm } from "../../hooks/product/useProductForm";
import ProductList from "../product/ProductList";

const ProductPage = () => {
  const {
    formProduct,
    handleForm,
    submitProduct,
    errors,
    isPending,
    formEdit,
    updatedProd,
    delProd,
    toggleEdit,
    showEdit,
    handleFormEdit,
    detailProd,
    data,
    handleSearch,
    filterSearch,
    searching,
  } = useProductForm();

  const { data: categories, isLoading } = usegetAllCategories();

  return (
    <div>
      <div>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="searching"
          value={searching}
          onChange={handleSearch}
          placeholder="search product"
        />
      </div>
      <div>
        <form onSubmit={submitProduct}>
          {errors.length > 0 && (
            <div className="font-bold text-red-500 text-center">
              {errors.map((msg, index) => (
                <p key={index}> {msg}</p>
              ))}
            </div>
          )}
          <input
            type="text"
            name="name"
            value={formProduct.name}
            onChange={handleForm}
            placeholder="input name product"
          />
          <textarea
            name="description"
            value={formProduct.description}
            onChange={handleForm}
            placeholder="input description product"
          />
          <input
            type="number"
            name="price"
            value={formProduct.price}
            onChange={handleForm}
            placeholder="input price product"
          />
          <input
            type="number"
            name="stock"
            value={formProduct.stock}
            onChange={handleForm}
            placeholder="input stock product"
          />
          <select name="category">
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button type="submit">
            {isPending ? "...Adding Product" : "Add Product"}
          </button>
        </form>
      </div>
      <ProductList
        data={data || []}
        formEdit={formEdit}
        updatedProd={updatedProd}
        delProd={delProd}
        toggleEdit={toggleEdit}
        showEdit={showEdit}
        handleFormEdit={handleFormEdit}
        detailProd={detailProd}
        filterSearch={filterSearch || []}
      />
    </div>
  );
};

export default ProductPage;
