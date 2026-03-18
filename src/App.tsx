import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CartList from "./pages/cart/CartList";
import CategoryPage from "./pages/category/CategoryPage";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/product/ProductDetail";
import ProductPage from "./pages/product/ProductPage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/masterData" element={<CategoryPage />} />
            <Route path="/cart" element={<CartList />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
