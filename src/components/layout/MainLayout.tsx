import { Outlet } from "react-router-dom";
import { useGetCart } from "../../hooks/cart/useCart";
import Navbar from "./Navbar";

const MainLayout = () => {
  useGetCart();
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 animate-in fade-in duration-500">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src="/logo.png"
              alt="EasyCart"
              className="h-10 w-auto opacity-50 grayscale"
            />
            <p className="text-muted text-sm font-medium">
              © 2026 EasyCart. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 text-muted text-sm font-semibold">
            <a href="#" className="hover:text-primary transition-elegant">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-elegant">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-elegant">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
