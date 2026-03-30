import { Outlet } from "react-router-dom";
import { useGetCart } from "../hooks/cart/useCart";
import Navbar from "./Navbar";

const MainLayout = () => {
  useGetCart();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
