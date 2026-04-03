import { useDeleteModal } from "../../hooks/delete/useDeleteModal";
import type { CategoryItemProps } from "../../types/types";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";

const CategoryItem = ({
  category,
  formEdit,
  isShowEdit,
  onToggleEdit,
  onDelete,
  onUpdate,
  onChangeEdit,
}: CategoryItemProps) => {
  const { isOpen, selectedId, handleOpen, handleClose } = useDeleteModal();
  return (
    <div className="border border-slate-300 rounded-lg p-2 my-2 flex items-center justify-between">
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
              onClick={() => handleOpen(category.id)}
              className="bg-red-500 px-2 py-1 rounded"
              name="Delete"
            />

            <Modal
              open={isOpen}
              handleClose={handleClose}
              title="Delete Category?"
              content="Are you sure want delete this Category?"
              onConfirm={() => {
                onDelete(selectedId);
                handleClose();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryItem;
