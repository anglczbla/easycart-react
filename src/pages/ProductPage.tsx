import { useProductForm } from "../hooks/product/useProductForm";
import ProductList from "./ProductList";

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
          <input
            type="text"
            name="category"
            value={formProduct.category}
            onChange={handleForm}
            placeholder="input category product"
          />
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
