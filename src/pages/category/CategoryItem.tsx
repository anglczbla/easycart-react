import type { Category } from "../../types/types";
import Button from "../ui/Button";
import Input from "../ui/Input";

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
          <Input
            type="text"
            name="name"
            value={formEdit.name}
            onChange={onChangeEdit}
          />
          <Button
            onClick={() => onUpdate(formEdit)}
            className="  px-2 py-1 rounded"
            name="Save"
          />
          <Button
            onClick={() => onToggleEdit("")}
            className="bg-gray-500 px-2 py-1 rounded"
            name="Cancel"
          />
        </div>
      ) : (
        <>
          <span>{category.name}</span>
          <div className="flex gap-2">
            <Button
              onClick={() => onToggleEdit(category.id)}
              className="px-2 py-1 rounded"
              name="Edit"
            />
            <Button
              onClick={() => onDelete(category.id)}
              className="bg-red-500 px-2 py-1 rounded"
              name="Delete"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryItem;
