import { useState } from "react";

export const useDeleteModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const handleOpen = (id: string) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return { isOpen, selectedId, handleOpen, handleClose };
};
