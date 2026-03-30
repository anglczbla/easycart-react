import type { Category } from "../../types/types";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  categories: Category[] | undefined;
  editCategory: Category;
  showEdit: string | null | undefined;
  toggleEditCategory: (id: string) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (category: Category) => void;
  handleEditCategory: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
    <div className="mt-10">
      <h2 className="font-bold text-lg">Category List</h2>
      {!categories || categories.length === 0 ? (
        <p>No categories found.</p>
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
