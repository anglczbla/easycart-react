import { useCategoryForm } from "../../hooks/category/useCategoryForm";
import Button from "../ui/Button";
import Input from "../ui/Input";
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
    errors,
  } = useCategoryForm();

  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl mb-5">Category Management</h1>

      <form onSubmit={submitCategory} className="flex gap-2">
        <div>
          {errors.length > 0 && (
            <div className="font-bold text-red-500 text-center">
              {errors.map((msg, index) => (
                <p key={index}> {msg}</p>
              ))}
            </div>
          )}
        </div>
        <Input
          type="text"
          name="name"
          onChange={handleChangeCategory}
          value={category.name}
          placeholder="input category name"
        />
        <Button
          type="submit"
          disabled={isPendingAddCategory}
          className="  px-5 rounded-lg font-bold"
          name={isPendingAddCategory ? "...Add" : "Add"}
        />
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
