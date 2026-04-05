import type { CategoryListProps } from "../../types/types";
import CategoryItem from "./CategoryItem";

const CategoryList = ({
  categories,
  editCategory,
  showEdit,
  toggleEditCategory,
  deleteCategory,
  updateCategory,
  handleEditCategory,
}: CategoryListProps) => {
  return (
    <div className="max-w-7xl mt-10 mx-auro">
      <h2 className="font-bold text-lg mb-2">Category List</h2>
      {!categories || categories.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="rounded-full flex items-center justify-center mx-auto mb-4">
            <p>No Categories found.</p>
          </div>
        </div>
      ) : (
        categories.map((cat) => (
          <div className="p-2">
            <CategoryItem
              key={cat.id}
              category={cat}
              formEdit={editCategory}
              isShowEdit={cat.id === showEdit}
              onToggleEdit={toggleEditCategory}
              onDelete={deleteCategory}
              onUpdate={updateCategory}
              onChangeEdit={handleEditCategory}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;
