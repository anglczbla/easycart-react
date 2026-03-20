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
    dataProduct,
    inputValue,
    handleSearch,
    handleCategory,
    categoryValue,
    isLoadingSearch,
  } = useProductForm();

  const { data: categories, isLoading } = usegetAllCategories();

  return (
    <div>
      <div className="max-w-xl mx-auto text-center mb-10">
        <h4 className="font-semibold text-lg text-primary">Form Product</h4>
        <p className="font-medium text-md text-primary">Create New Product</p>
      </div>
      <div className="w-full lg:w-2/3 lg:mx-auto ">
        <div className="w-full px-4 mb-8">
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
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
            />
            <textarea
              name="description"
              value={formProduct.description}
              onChange={handleForm}
              placeholder="input description product"
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary mb-2"
            />
            <div className="flex gap-2">
              <input
                type="number"
                name="price"
                value={formProduct.price}
                onChange={handleForm}
                placeholder="input price product"
                className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
              />
              <input
                type="number"
                name="stock"
                value={formProduct.stock}
                onChange={handleForm}
                placeholder="input stock product"
                className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary  mb-2"
              />
            </div>

            <select
              name="category"
              value={formProduct.category}
              onChange={handleForm}
              className="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
            >
              <option value="">Select Category</option>
              {isLoading ? (
                <option disabled>Loading...</option>
              ) : (
                categories?.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))
              )}
            </select>
            <button
              type="submit"
              className="flex text-base font-semibold text-white bg-primary mt-5 py-3 px-8 rounded-full hover:opacity-80 hover:shadow-lg transition duration-500 cursor-pointer"
            >
              {isPending ? "...Adding Product" : "Add Product"}
            </button>
          </form>
        </div>
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
        filterSearch={
          inputValue !== "" || categoryValue !== ""
            ? dataProduct || []
            : data || []
        }
        categories={categories}
        inputValue={inputValue}
        categoryValue={categoryValue}
        handleSearch={handleSearch}
        handleCategory={handleCategory}
        isLoadingSearch={isLoadingSearch}
      />
    </div>
  );
};

export default ProductPage;
