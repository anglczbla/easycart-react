import { useState } from "react";
import type { EditFormReview, ReviewForm } from "../../types/types";
import { useAppSelector } from "../useAppSelector";
import { useGetReviewByProductId } from "./useReview";
import { useReviewActions } from "./useReviewActions";

export const useReviewForm = (productId?: string) => {
  const userId = useAppSelector((state) => state.auth.idUser);
  const {
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
    isPendingAdd,
    isPendingDelete,
    isPendingUpdate,
    errorAddReview,
    errorsUpdateReview,
  } = useReviewActions();
  const [formReview, setFormReview] = useState<ReviewForm>({
    comment: "",
    rating: "",
    user_id: "",
  });

  console.log("form review", formReview);

  const [formEditReview, setFormEditReview] = useState<EditFormReview>({
    id: "",
    comment: "",
    rating: "",
  });
  const { data: review } = useGetReviewByProductId(productId ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [editImage, setEditImage] = useState<File | null>(null);
  const [showEdit, setShowEdit] = useState<string | null>(null);
  console.log(showEdit);

  const toggleEdit = (id: string) => {
    setShowEdit(id);
  };

  const handleFormReview = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormReview({ ...formReview, [name]: value });
  };

  const handleEditFormReview = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormEditReview({ ...formEditReview, [name]: value });
  };

  const handleImageReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const handleEditImageReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setEditImage(e.target.files[0]);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", formReview.comment);
    formData.append("rating", formReview.rating);
    formData.append("user_id", userId);
    if (!productId) return;
    formData.append("product_id", productId);
    if (image) formData.append("image", image);

    handleAddReview(productId, formData, () => {
      setFormReview({
        comment: "",
        rating: "",
        user_id: "",
      });
      setImage(null);
    });
  };

  const submitUpdateReview = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", formEditReview.comment);
    formData.append("rating", formEditReview.rating);
    if (editImage) formData.append("image", editImage);

    handleUpdateReview(formEditReview.id, formData, () => {
      setShowEdit(null);

      setFormEditReview({
        id: "",
        comment: "",
        rating: "",
      });
      setEditImage(null);
    });
  };

  return {
    submitReview,
    submitUpdateReview,
    handleDeleteReview,
    handleImageReview,
    handleFormReview,
    formReview,
    review,
    formEditReview,
    handleEditFormReview,
    handleEditImageReview,
    setFormEditReview,
    isPendingAdd,
    isPendingDelete,
    isPendingUpdate,
    errorAddReview,
    errorsUpdateReview,
    showEdit,
    toggleEdit,
  };
};
