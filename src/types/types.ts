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
  price: number;
  stock: number;
  category: string;
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
}
