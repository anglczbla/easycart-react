import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./pages/category/CategoryPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AllOrderPage from "./pages/order/admin/AllOrderPage";
import OrderHistoryPage from "./pages/order/OrderHistoryPage";
import OrderPage from "./pages/order/OrderPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import ProductPage from "./pages/product/ProductPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminRoute from "./route/AdminRoute";
import ProtectedRoute from "./route/ProtectedRoute";
import UserRoute from "./route/UserRoute";
import { store } from "./store/store";

const queryClient = new QueryClient();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-center"
            toastOptions={{
              className:
                "rounded-2xl font-semibold text-sm card-shadow border border-gray-100",
              duration: 3000,
              style: {
                padding: "16px 24px",
                color: "var(--color-primary)",
                background: "white",
              },
              success: {
                iconTheme: {
                  primary: "var(--color-success)",
                  secondary: "white",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--color-error)",
                  secondary: "white",
                },
              },
            }}
          />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route element={<UserRoute />}>
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/order-history" element={<OrderHistoryPage />} />
                </Route>
                <Route element={<AdminRoute />}>
                  <Route path="/masterData" element={<CategoryPage />} />
                  <Route path="/all-orders" element={<AllOrderPage />} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
