import type { Category } from "../../hooks/category/useCategory";

interface CategoryItemProps {
  category: Category;
  formEdit: Category;
  isShowEdit: boolean;
  onToggleEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (category: Category) => void;
  onChangeEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategoryItem = ({
  category,
  formEdit,
  isShowEdit,
  onToggleEdit,
  onDelete,
  onUpdate,
  onChangeEdit,
}: CategoryItemProps) => {
  return (
    <div className="border p-2 my-2 flex items-center justify-between">
      {isShowEdit ? (
        <div className="flex gap-2 w-full">
          <input
            type="text"
            name="name"
            value={formEdit.name}
            onChange={onChangeEdit}
            className="border p-1 flex-grow"
          />
          <button
            onClick={() => onUpdate(formEdit)}
            className="bg-green-500 text-white px-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => onToggleEdit("")}
            className="bg-gray-500 text-white px-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span>{category.name}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onToggleEdit(category.id)}
              className="bg-blue-500 text-white px-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(category.id)}
              className="bg-red-500 text-white px-2 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryItem;
