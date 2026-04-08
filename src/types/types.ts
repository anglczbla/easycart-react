export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  phone: string;
  address: string;
  city: string;
  avatar: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  image: string;
}

export interface ProductForm {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}

export interface Cart {
  cart_id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface AddToCart {
  product_id: string;
  quantity: number;
}

export interface deleteItemCart {
  id: string;
  product_id: string;
}

export interface UpdateCart extends deleteItemCart {
  quantity: number;
}

export interface RegisterInput {
  email: string;
  username: string;
  password?: string;
}

export interface LoginInput {
  email: string;
  password?: string;
}

export interface Order {
  id: string;
  userId: string;
  total_price: number;
  shipping_address: string;
  status: string;
  product_name: string;
  quantity: number;
  product_image: string;
  created_at: string;
  image: string;
}

export interface OrderUsers extends Order {
  customer_name: string;
}

export interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errors?: string[];
}

export interface ButtonProps {
  name: string | React.ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export interface PriceTagProps {
  price: string | number | undefined;
  className?: string;
}

export interface CartItemProps {
  cart: Cart;
  onDelete: () => void;
  onIncrementQty: () => void;
  onDecrementQty: () => void;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export interface CategoryItemProps {
  category: Category;
  formEdit: Category;
  isShowEdit: boolean;
  onToggleEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (category: Category) => void;
  onChangeEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CategoryListProps {
  categories: Category[] | undefined;
  editCategory: Category;
  showEdit: string | null | undefined;
  toggleEditCategory: (id: string) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (category: Category) => void;
  handleEditCategory: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AllOrderPageListProps {
  item: OrderUsers;
  updatingOrder: (data: Order) => void;
  toggleEdit: (id: string, status: string) => void;
  cancelButton: () => void;
  showEdit: string | false;
  status: string;
  handleChangeStatus: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface ProductEditFormProps {
  product: Product;
  categories?: Category[];
  onCancel: () => void;
}

export interface ProductList {
  products: Product[];
  admin?: boolean;
}

export interface ProductItemProps {
  product: Product;
  admin?: boolean;
  categories?: Category[];
}

export interface ProductListProps {
  products: Product[];
  admin?: boolean;
}

export interface Review {
  id: string;
  user_id: string;
  comment: string;
  username: string;
  product_id: string;
  product_name: string;
  rating: number;
  image: string | null;
}

export interface ReviewForm {
  comment: string;
  rating: string;
  user_id: string;
}

export interface EditFormReview {
  comment: string;
  rating: string;
  id: string;
}

export interface ApiError {
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ReviewItemProps {
  review: Review;
  deleteReview: (id: string, prodId: string) => void;
  showEdit: string | null;
  toggleEdit: (id: string) => void;
  submitUpdateReview: (e: React.FormEvent) => void;
  handleEditFormReview: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleEditImageReview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormEditReview: React.Dispatch<React.SetStateAction<EditFormReview>>;
  formEditReview: EditFormReview;
  isPendingUpdate: boolean;
  errors?: ApiError;
}

export interface ReviewListProps {
  review: Review[];
  deleteReview: (id: string, prodId: string) => void;
  showEdit: string | null;
  toggleEdit: (id: string) => void;
  submitUpdateReview: (e: React.FormEvent) => void;
  handleEditFormReview: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleEditImageReview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormEditReview: React.Dispatch<React.SetStateAction<EditFormReview>>;
  formEditReview: EditFormReview;
  isPendingUpdate: boolean;
  errors?: ApiError;
}

export interface ReviewEditProps {
  review: Review;
  submitUpdateReview: (e: React.FormEvent) => void;
  handleEditFormReview: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleEditImageReview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormEditReview: React.Dispatch<React.SetStateAction<EditFormReview>>;
  formEditReview: EditFormReview;
  isPendingUpdate: boolean;
  errors?: ApiError;
  onCancel: () => void;
}
