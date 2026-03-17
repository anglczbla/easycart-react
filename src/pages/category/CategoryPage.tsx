import { useCategoryForm } from "../../hooks/category/useCategoryForm";
import CategoryList from "./CategoryList";

const CategoryPage = () => {
  const {
    categoriesProduct,
    category,
    editCategory,
    showEdit,
    toggleEditCategory,
    submitCategory,
    isPendingAddCategory,
    updateCategory,
    deleteCategory,
    handleChangeCategory,
    handleEditCategory,
  } = useCategoryForm();

  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl mb-5">Category Management</h1>

      <form onSubmit={submitCategory} className="flex gap-2">
        <input
          type="text"
          name="name"
          onChange={handleChangeCategory}
          value={category.name}
          placeholder="input category name"
          className="border p-2 rounded-lg flex-grow"
        />
        <button
          type="submit"
          disabled={isPendingAddCategory}
          className="bg-sky-400 text-white px-5 rounded-lg font-bold"
        >
          {isPendingAddCategory ? "...Add" : "Add"}
        </button>
      </form>

      <CategoryList
        categories={categoriesProduct}
        editCategory={editCategory}
        showEdit={showEdit}
        toggleEditCategory={toggleEditCategory}
        deleteCategory={deleteCategory}
        updateCategory={updateCategory}
        handleEditCategory={handleEditCategory}
      />
    </div>
  );
};

export default CategoryPage;
