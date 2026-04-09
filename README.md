# EasyCart 🛒
### A Modern E-Commerce Web Application

EasyCart is a fully functional e-commerce application built with **React 19**, **Vite**, **Redux Toolkit**, and **TanStack Query**. It features a clean, responsive UI styled with Tailwind CSS — offering a seamless shopping experience for users and a comprehensive management dashboard for administrators.

---

## ✨ Features

### For Users 🛍️
- **Authentication** — Secure login and registration
- **Product Discovery** — Browse, search, and filter products by category
- **Product Details** — View detailed info, stock availability, and reviews
- **Shopping Cart** — Add, update quantity, and remove items
- **Checkout** — Confirm shipping address and upload payment proof
- **Order History** — Track the status of current and past orders
- **Profile Management** — Update personal info, address, and profile picture
- **Product Reviews** — Leave ratings and comments with image support

### For Administrators ⚙️
- **Secure Dashboard** — Admin-only protected routes
- **Product Management** — Full CRUD with image upload support
- **Category Management** — Manage master data for product categories
- **Order Management** — View all orders and update statuses (Pending → Processing → Shipped → Delivered)
- **Review Management** — Oversee and moderate user reviews

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Core | React 19, TypeScript, Vite |
| Routing | React Router v6 |
| Global State | Redux Toolkit (Auth & Cart) |
| Server State | TanStack Query v5 (fetching & caching) |
| Styling | Tailwind CSS v4, Lucide React |
| API Client | Axios (with interceptors for token handling) |
| UX | React Hot Toast |

---

## 📂 Project Structure

```
src/
├── assets/         # Static assets (images, SVGs)
├── components/     # Reusable UI components (Auth, Cart, Product, etc.)
├── hooks/          # Custom React hooks (encapsulating React Query logic)
├── lib/            # Library configurations (Axios instance, etc.)
├── pages/          # Page components mapped to routes
├── route/          # Route guards (AdminRoute, ProtectedRoute, etc.)
├── store/          # Redux Toolkit slices and store configuration
├── types/          # TypeScript interface definitions
└── utils/          # Helper/utility functions
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/easycart-react.git
   cd easycart-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_BE_URL=http://localhost:5000/api
   ```
   > Replace the URL with your actual backend API endpoint https://github.com/anglczbla/easycart-be

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**

   Navigate to [http://localhost:5173](http://localhost:5173)

---

## 📸 Screenshots

### User Interface

| Home Page | Products Page |
|:---:|:---:|
| ![Home Page](https://github.com/user-attachments/assets/f649b2b7-0e55-4c91-ba3a-a3b5ea637fef) | ![Products Page](https://github.com/user-attachments/assets/ae21ec84-7ce8-4984-b900-7824fea69890)|

| Product Detail | Shopping Cart |
|:---:|:---:|
| ![Product Detail](https://github.com/user-attachments/assets/a2b2cdfc-e68b-47c1-b975-015d7aedce0c)  | ![Shopping Cart](https://github.com/user-attachments/assets/9c0e114a-0308-4834-beff-b62e06b265bc) |

| Order Page | Profile |
|:---:|:---:|
| ![Order Page](https://github.com/user-attachments/assets/d63d8498-4f6c-472f-b601-2b0a177fa29e) | ![Profile](https://github.com/user-attachments/assets/e60683ad-f387-41a4-b0b1-d65c8dd71457) |

| Order History | |
|:---:|:---:|
| ![Order History](https://github.com/user-attachments/assets/13ac1336-3dfa-4495-b5e9-7162f88f0836) | |

### Admin Interface

| All Orders | Product Management |
|:---:|:---:|
| ![All Orders](https://github.com/user-attachments/assets/bfab4bb0-1a6d-4072-b647-d8cdf4e9889c) | ![Product Management](https://github.com/user-attachments/assets/5bd6d0f8-6a10-4437-b659-c646b9cc099c) |

| Category Management | Product Form |
|:---:|:---:|
| ![Category Management](https://github.com/user-attachments/assets/a3c684ef-4a7f-4dcf-b3b5-f13954746644) | ![Product Form](https://github.com/user-attachments/assets/99deca0f-4cff-4362-8d1e-c6ad0226087c) |

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
