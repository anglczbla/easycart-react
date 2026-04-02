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
  name: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
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

export interface ProductItemProps {
  product: Product;
  admin: boolean;
  formUpdateProduct: ProductForm;
  isShowEditButton: boolean;
  onUpdateProduct: (updatedProduct: ProductForm) => void;
  onDeleteProduct: (id: string) => void;
  onToggleEditProduct: (id: string) => void;
  handleFormEdit: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onProductClicked: (id: string) => void;
  categories: Category[] | undefined;
  handleEditImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ProductListProps {
  formEdit: ProductForm;
  admin: boolean;
  updatedProd: (updatedProduct: ProductForm) => void;
  delProd: (id: string) => void;
  toggleEdit: (id: string) => void;
  showEdit: any;
  handleFormEdit: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  detailProd: (id: string) => void;
  data: Product[];
  filterSearch: Product[];
  categories: Category[] | undefined;
  inputValue: string;
  categoryValue: string;
  handleSearch: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;

  handleCategory: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  isLoadingSearch?: boolean;
  handleEditImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
